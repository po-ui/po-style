/** Cruza os arquivos alterados com o grafo: unidades afetadas, consumidores, risco e onde testar. */

const { LIB_DIR, THEME_DEFAULT, AGGREGATOR_UNITS, NON_FUNCTIONAL, RISK_ORDER } = require('./constants');
const { displayName } = require('./units');
const { collectImpact } = require('./graph');
const { segmentsOf, apiChanges } = require('./changed-files');

function groupByUnit(libFiles, graph) {
  const units = new Map();
  for (const file of libFiles) {
    const rel = file.filename.slice(LIB_DIR.length + 1);
    for (const segment of segmentsOf(rel, file.patch, graph)) {
      if (!units.has(segment.unit)) {
        units.set(segment.unit, {
          categories: new Set(),
          files: new Set(),
          lines: [],
          startNodes: new Set(),
          targets: new Set(),
          functional: false,
          removedFiles: new Set()
        });
      }

      const info = units.get(segment.unit);
      const functional = !NON_FUNCTIONAL.has(segment.category);
      info.categories.add(segment.category);
      info.files.add(rel);
      info.lines.push(...segment.lines);
      if (functional) {
        info.functional = true;
        segment.startNodes.forEach(n => info.startNodes.add(n));
        segment.targets.forEach(t => info.targets.add(t));
      }
      if (functional && file.status === 'removed') {
        info.removedFiles.add(rel);
      }
    }
  }
  return units;
}

function scoreRisk(info, api, impactedCount) {
  const reasons = [];
  if (!info.functional) {
    return { risk: 'low', reasons };
  }

  let score = 1;
  if (impactedCount >= 25) {
    score += 3;
    reasons.push(`usado por ${impactedCount} unidades`);
  } else if (impactedCount >= 10) {
    score += 2;
    reasons.push(`${impactedCount} unidades dependem dele`);
  } else if (impactedCount >= 3) {
    score += 1;
  }
  if (api.removedTokens.length || api.removedClasses.length || info.removedFiles.size) {
    score += 2;
    reasons.push('possível breaking change');
  }
  if (info.categories.has('exports')) {
    score += 1;
    reasons.push('altera imports (index.css)');
  }

  const risk = score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low';
  return { risk, reasons };
}

// Impacto pelo grafo, somado às unidades estilizadas diretamente pelas regras alteradas.
function impactOf(graph, startNodes, targets) {
  const impact = collectImpact(graph, startNodes);
  for (const target of targets) {
    if (!impact.has(target)) {
      impact.set(target, 1);
    }
  }
  return impact;
}

function describeUnit(graph, unit, info) {
  const impact = impactOf(graph, [...info.startNodes], info.targets);
  impact.delete(unit);
  const impacted = [...impact].filter(([u]) => !AGGREGATOR_UNITS.has(u));
  const direct = impacted.filter(([, distance]) => distance === 1).map(([u]) => displayName(u));
  const api = apiChanges(info.lines);

  // Comentários alterados junto com código não mudam o tipo da mudança.
  const categories = [...info.categories].filter(c => !info.functional || c !== 'doc');

  return {
    unit,
    name: displayName(unit),
    categories,
    files: [...info.files],
    ...api,
    removedFiles: [...info.removedFiles],
    directConsumers: direct.sort(),
    transitiveCount: impacted.length,
    functional: info.functional,
    ...scoreRisk(info, api, impacted.length)
  };
}

const maxRisk = risks => risks.reduce((acc, r) => (RISK_ORDER.indexOf(r) > RISK_ORDER.indexOf(acc) ? r : acc), 'low');

function analyze(changedFiles, graph) {
  const libFiles = changedFiles.filter(f => f.filename.startsWith(`${LIB_DIR}/`));
  const units = groupByUnit(libFiles, graph);

  const changed = [...units]
    .map(([unit, info]) => describeUnit(graph, unit, info))
    .sort((a, b) => RISK_ORDER.indexOf(b.risk) - RISK_ORDER.indexOf(a.risk));

  const allStartNodes = [...units.values()].flatMap(info => [...info.startNodes]);
  const allTargets = [...units.values()].flatMap(info => [...info.targets]);
  const affected = [...impactOf(graph, allStartNodes, allTargets)].filter(
    ([unit]) => !units.has(unit) && !AGGREGATOR_UNITS.has(unit)
  );
  const direct = affected.filter(([, d]) => d === 1).map(([u]) => u);
  const indirect = affected.filter(([, d]) => d > 1).map(([u]) => u);

  // Só entram unidades com prévia no app de desenvolvimento: primeiro as alteradas, depois os consumidores diretos.
  const testTargets = [...changed.filter(c => c.functional).map(c => c.unit), ...[...direct].sort()]
    .filter(u => graph.previews.has(u))
    .map(u => ({ name: displayName(u), previews: graph.previews.get(u) }));

  return {
    changed,
    directConsumers: direct.map(displayName).sort(),
    indirectConsumers: indirect.map(displayName).sort(),
    testTargets,
    overallRisk: maxRisk(changed.map(c => c.risk)),
    themeChanged: libFiles.some(f => f.filename === `${LIB_DIR}/${THEME_DEFAULT}`),
    stats: {
      files: changedFiles.length,
      libFiles: libFiles.length,
      outsideFiles: changedFiles.length - libFiles.length,
      additions: changedFiles.reduce((sum, f) => sum + f.additions, 0),
      deletions: changedFiles.reduce((sum, f) => sum + f.deletions, 0)
    }
  };
}

module.exports = { analyze };
