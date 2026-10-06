/** Helpers de texto usados no comentário da PR e no Discord, incluindo os pontos de atenção. */

const { CATEGORY_LABELS } = require('./constants');

const code = text => `\`${text}\``;

function truncateList(items, max = 15) {
  if (items.length <= max) {
    return items.join(', ');
  }
  return `${items.slice(0, max).join(', ')} … (+${items.length - max})`;
}

const truncateText = (text, max) => (text.length <= max ? text : `${text.slice(0, max - 1)}…`);

const categoryLabels = categories => categories.map(c => CATEGORY_LABELS[c]).join(', ');

const codeList = (items, max = 10) => truncateList(items.map(code), max);

// Título no padrão de commit: "fix(button): corrige ..." → { type: 'fix', scope: 'button' }
function parseTitle(title = '') {
  const match = title.match(/^(\w+)(?:\(([^)]+)\))?!?:/);
  return match ? { type: match[1], scope: match[2] || '' } : { type: '', scope: '' };
}

function attentionItems(result) {
  const items = [];
  for (const c of result.changed) {
    if (c.removedTokens.length) {
      items.push(
        `⚠️ ${code(c.name)}: token removido/renomeado → ${codeList(c.removedTokens)} (documente como BREAKING CHANGE)`
      );
    }
    if (c.removedClasses.length) {
      items.push(
        `⚠️ ${code(c.name)}: classe removida/renomeada → ${codeList(c.removedClasses)} (confira o uso no po-angular)`
      );
    }
    if (c.removedFiles.length) {
      items.push(`⚠️ ${code(c.name)}: ${c.removedFiles.length} arquivo(s) removido(s)`);
    }
    if (c.addedTokens.length) {
      items.push(`🆕 ${code(c.name)}: novo(s) token(s) → ${codeList(c.addedTokens)}`);
    }
    if (c.functional && c.transitiveCount >= 25) {
      items.push(
        `🌐 ${code(c.name)} é usado por ${c.transitiveCount} unidades — considere um teste de regressão amplo`
      );
    }
  }
  if (result.themeChanged) {
    items.push('🔁 `po-theme-default.css` alterado — replique em `po-theme-totvs` (`src/po-theme-custom.css`)');
  }
  if (result.changed.length && result.changed.every(c => !c.functional)) {
    items.push('✅ Apenas prévias (html) ou documentação foram alteradas');
  }
  return items;
}

module.exports = { code, truncateList, truncateText, categoryLabels, parseTitle, attentionItems };
