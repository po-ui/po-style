/**
 * Lê os arquivos alterados (API do GitHub ou git local) e divide cada um em segmentos por unidade.
 * No arquivo de tema, cada linha alterada pertence ao bloco em que está (po-button { ... } → po-button).
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { tokenNode, unitOf, isThemeFile } = require('./units');
const { themeOwners, resolveOwner } = require('./graph');
const css = require('./css');

const GIT_STATUS = { A: 'added', D: 'removed', M: 'modified', R: 'renamed' };
const HUNK = /^@@ -(\d+)(?:,\d+)? \+\d+(?:,\d+)? @@/;
const MIXIN_DEFINITION = /^\s*(--[\w-]+)\s*:?\s*\{/;
const DECLARATION = /^\s*[\w-]+\s*:\s|;/;
const CLASS = /\.(po-[\w-]+)/g;

function fromGitHubApi(filesJson) {
  return JSON.parse(fs.readFileSync(filesJson, 'utf8')).map(f => ({
    filename: f.filename,
    status: f.status,
    additions: f.additions || 0,
    deletions: f.deletions || 0,
    patch: f.patch || ''
  }));
}

function fromGit(base, head = 'HEAD') {
  const range = `${base}...${head}`;
  const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

  return git('diff', '--numstat', range)
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(line => {
      const [additions, deletions, filename] = line.split('\t');
      const status = git('diff', '--name-status', range, '--', filename).trim().charAt(0);
      return {
        filename,
        status: GIT_STATUS[status] || 'modified',
        additions: Number(additions) || 0,
        deletions: Number(deletions) || 0,
        patch: git('diff', '-U0', range, '--', filename)
      };
    });
}

function parseHunks(patch) {
  const hunks = [];
  for (const raw of patch.split('\n')) {
    const header = raw.match(HUNK);
    if (header) {
      // Com -U0, "-10,0" indica inserção após a linha 10; nos demais casos o hunk começa na própria linha.
      hunks.push({ oldStart: Number(header[1]) + (/^@@ -\d+,0 /.test(raw) ? 1 : 0), lines: [] });
    } else if (hunks.length && /^[ +-]/.test(raw)) {
      hunks[hunks.length - 1].lines.push({ sign: raw.charAt(0), text: raw.slice(1) });
    }
  }
  return hunks;
}

/**
 * O patch é calculado a partir do merge-base da PR, que pode estar atrás da branch base usada no grafo.
 * Ancora o hunk pelo conteúdo (linhas de contexto e removidas) mais próximo da posição informada;
 * sem âncora (inserção pura), aplica o deslocamento do hunk anterior.
 */
function anchorHunk(hunk, sourceLines, delta) {
  const old = hunk.lines.filter(l => l.sign !== '+').map(l => l.text.trimEnd());
  const expected = hunk.oldStart - 1 + delta;
  if (!old.length || !sourceLines) {
    return expected + 1;
  }
  const matchesAt = i => old.every((text, k) => (sourceLines[i + k] || '').trimEnd() === text);
  for (let distance = 0; distance < sourceLines.length; distance++) {
    for (const i of [expected - distance, expected + distance]) {
      if (i >= 0 && matchesAt(i)) {
        return i + 1;
      }
    }
  }
  return expected + 1;
}

/**
 * Linhas alteradas do patch com o escopo (pilha de seletores) de cada uma.
 * Linhas removidas usam o arquivo da branch base; linhas adicionadas partem do ponto de inserção na base
 * e acompanham as chaves abertas e fechadas nas próprias linhas adicionadas.
 */
function changedLines(patch, parsed) {
  const result = [];
  let delta = 0;
  let inComment = false;

  for (const hunk of parseHunks(patch)) {
    let oldLine = anchorHunk(hunk, parsed && parsed.sourceLines, delta);
    delta = oldLine - hunk.oldStart;
    let added = null;

    for (const { sign, text } of hunk.lines) {
      const comment = inComment || /^\s*(\/\*|\*|$)/.test(text);
      if (text.includes('/*') && !text.includes('*/')) {
        inComment = true;
      } else if (text.includes('*/')) {
        inComment = false;
      }

      if (sign === '+') {
        added = added || { stack: (parsed ? parsed.after[oldLine - 1] || [] : []).slice(), buffer: '' };
        const startsItem = !added.buffer.trim() || added.buffer.trim().endsWith(',');
        const scope = applyBraces(added, comment ? '' : text);
        result.push({ sign, text, comment, scope, selectorItem: startsItem && isSelectorLine(text) });
        continue;
      }
      added = null;
      if (sign === '-') {
        const previous = parsed ? parsed.lines[oldLine - 2] : '';
        const startsItem = !previous || !previous.trim() || /[,{};]\s*$/.test(previous);
        const scope = parsed ? parsed.during[oldLine] || [] : [];
        result.push({ sign, text, comment, scope, selectorItem: startsItem && isSelectorLine(text) });
      }
      oldLine++;
    }
  }
  return result;
}

const isSelectorLine = text => /[{,]\s*$/.test(text) && !DECLARATION.test(text);

// Atualiza a pilha com as chaves da linha e retorna a pilha mais profunda vista nela.
// O buffer continua entre as linhas para montar seletores que ocupam várias linhas.
function applyBraces(state, text) {
  let deepest = state.stack.slice();
  for (const char of `${css.stripComments(text)}\n`) {
    if (char === '{') {
      state.stack.push(state.buffer.trim().replace(/\s+/g, ' '));
      state.buffer = '';
      if (state.stack.length > deepest.length) {
        deepest = state.stack.slice();
      }
    } else if (char === '}') {
      state.stack.pop();
      state.buffer = '';
    } else if (char === ';') {
      state.buffer = '';
    } else {
      state.buffer += char;
    }
  }
  return deepest;
}

function categoryOfPath(relPath) {
  if (relPath.endsWith('.md')) {
    return 'doc';
  }
  if (relPath.endsWith('.html')) {
    return 'preview';
  }
  if (relPath.endsWith('.js')) {
    return 'script';
  }
  if (path.basename(relPath) === 'index.css') {
    return 'exports';
  }
  return isThemeFile(relPath) ? 'tokens' : 'style';
}

// Para cada linha CSS alterada: unidades donas, categoria e nó do grafo onde o impacto começa.
function classifyLine(relPath, line, names) {
  const fileUnit = unitOf(relPath);
  const root = css.isRootScope(line.scope);
  const theme = isThemeFile(relPath);
  const owners = theme && !root ? themeOwners(names, line.scope) : [];
  const units = owners.length ? owners : [fileUnit];
  const category = line.comment ? 'doc' : theme || root ? 'tokens' : 'style';
  const targets = theme || root || line.comment ? [] : styledUnits(names, line, fileUnit);

  return units.map(unit => ({
    unit,
    category,
    start: line.comment ? null : startNode(relPath, line, root, owners, unit),
    targets
  }));
}

/**
 * Outras unidades em cujo contexto a regra alterada se aplica, pelo primeiro composto do seletor:
 * "po-timepicker .po-x" em po-input.css → po-timepicker; ".po-tree-view-item .po-button" → só po-tree-view.
 */
function styledUnits(names, line, fileUnit) {
  const [outer] = css.selectorsOf(line.scope);
  const selector = outer || (line.selectorItem ? line.text : '');
  const owners = css.leadingNames(selector).map(n => resolveOwner(names, n));
  return [...new Set(owners)].filter(u => u && u !== fileUnit);
}

function startNode(relPath, line, root, owners, unit) {
  if (root) {
    const token = css.mixinOf(line.scope) || css.declaredToken(line.text.trim());
    return token ? tokenNode(token) : null;
  }
  return owners.length ? `${unit}/@theme` : relPath;
}

/**
 * Divide o arquivo alterado em segmentos { unit, category, lines, startNodes }.
 * `relPath` é relativo a LIB_DIR; `graph` traz o CSS da base já lido e o índice de nomes.
 */
function segmentsOf(relPath, patch, graph) {
  const category = categoryOfPath(relPath);
  const lines = patch ? changedLines(patch, graph.sources.get(relPath)) : [];
  const plain = {
    unit: unitOf(relPath),
    category,
    lines,
    startNodes: new Set(category === 'exports' ? [] : [relPath]),
    targets: new Set()
  };

  if (!relPath.endsWith('.css') || category === 'exports' || !lines.length) {
    if (lines.length && lines.every(l => l.comment)) {
      plain.category = 'doc';
      plain.startNodes.clear();
    }
    return [plain];
  }

  const segments = new Map();
  for (const line of lines) {
    for (const { unit, category: lineCategory, start, targets } of classifyLine(relPath, line, graph.names)) {
      const key = `${unit}|${lineCategory}`;
      if (!segments.has(key)) {
        segments.set(key, { unit, category: lineCategory, lines: [], startNodes: new Set(), targets: new Set() });
      }
      const segment = segments.get(key);
      segment.lines.push(line);
      if (start) {
        segment.startNodes.add(start);
      }
      targets.forEach(t => segment.targets.add(t));
    }
  }
  return [...segments.values()];
}

// Tokens e classes adicionados e removidos. Removido sem ser readicionado = possível breaking change.
function apiChanges(lines) {
  const sets = { '+': { tokens: new Set(), classes: new Set() }, '-': { tokens: new Set(), classes: new Set() } };
  for (const { sign, text, comment } of lines) {
    if (comment) {
      continue;
    }
    const target = sets[sign];
    const token = css.declaredToken(text.trim()) || (text.match(MIXIN_DEFINITION) || [])[1];
    if (token) {
      target.tokens.add(token);
    } else if (isSelectorLine(text)) {
      for (const [, name] of text.matchAll(CLASS)) {
        target.classes.add(name);
      }
    }
  }
  const diff = (a, b) => [...a].filter(x => !b.has(x));
  return {
    addedTokens: diff(sets['+'].tokens, sets['-'].tokens),
    removedTokens: diff(sets['-'].tokens, sets['+'].tokens),
    removedClasses: diff(sets['-'].classes, sets['+'].classes)
  };
}

module.exports = { fromGitHubApi, fromGit, changedLines, segmentsOf, apiChanges };
