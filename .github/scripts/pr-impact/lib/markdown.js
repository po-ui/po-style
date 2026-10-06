/** Monta o relatório completo publicado como comentário na PR. */

const { RISK } = require('./constants');
const { code, truncateList, categoryLabels, attentionItems } = require('./format');

function summaryLine({ overallRisk, stats }) {
  const risk = RISK[overallRisk];
  const outside = stats.outsideFiles ? ` · ${stats.outsideFiles} fora de \`src/css\` (não analisados)` : '';
  return (
    `**Risco estimado:** ${risk.emoji} ${risk.label} · ` +
    `**Arquivos:** ${stats.files} (+${stats.additions}/-${stats.deletions})${outside}`
  );
}

function unitRow(c) {
  const risk = RISK[c.risk];
  const consumers = c.directConsumers.length ? truncateList(c.directConsumers.map(code), 8) : '—';
  const reasons = c.reasons.length ? ` — ${c.reasons.join('; ')}` : '';
  const riskText = `${risk.emoji} ${risk.label}${reasons}`;
  return `| ${code(c.name)} | ${categoryLabels(c.categories)} | ${consumers} | ${c.transitiveCount} | ${riskText} |`;
}

const details = (summary, body) => [`<details><summary>${summary}</summary>`, '', body, '', '</details>', ''];

function impactedSection({ directConsumers, indirectConsumers }) {
  if (!directConsumers.length && !indirectConsumers.length) {
    return [];
  }
  const lines = ['### Unidades impactadas', ''];
  if (directConsumers.length) {
    lines.push(`**Diretas (${directConsumers.length}):** ${directConsumers.map(code).join(', ')}`, '');
  }
  if (indirectConsumers.length) {
    lines.push(
      ...details(`<b>Via tokens derivados (${indirectConsumers.length})</b>`, indirectConsumers.map(code).join(', '))
    );
  }
  return lines;
}

function buildMarkdown(result, pr) {
  const lines = ['<!-- pr-impact-report -->', '## 🔎 Análise de impacto', '', summaryLine(result), ''];

  if (!result.changed.length) {
    lines.push('Nenhum arquivo de `src/css` foi alterado nesta PR.');
    return lines.join('\n');
  }

  const attention = attentionItems(result);
  if (attention.length) {
    lines.push('### Pontos de atenção', '', ...attention.map(a => `- ${a}`), '');
  }

  lines.push(
    '### Unidades alteradas',
    '',
    '| Unidade | Tipo de mudança | Consumidores diretos | Impacto total | Risco |',
    '|---|---|---|---|---|',
    ...result.changed.map(unitRow),
    '',
    ...impactedSection(result)
  );

  if (result.testTargets.length) {
    lines.push(
      '### Onde testar',
      '',
      'Prévias do app de desenvolvimento (`npm run build && npm run dev`):',
      '',
      ...result.testTargets.map(t => `- [ ] ${code(t.name)} — ${truncateList(t.previews, 3)}`),
      ''
    );
  }

  const filesByUnit = result.changed.map(c => `- ${code(c.name)}: ${c.files.map(code).join(', ')}`).join('\n');
  const prRef = pr.number ? ` · PR #${pr.number}` : '';
  lines.push(
    ...details('Arquivos por unidade', filesByUnit),
    `<sub>Gerado automaticamente a partir dos tokens e seletores CSS da branch base${prRef}.</sub>`
  );
  return lines.join('\n');
}

module.exports = { buildMarkdown };
