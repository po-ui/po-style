/** Converte o caminho de um arquivo (ou nó do grafo) na unidade a que ele pertence. */

const path = require('path');

const toPosix = filePath => filePath.split(path.sep).join('/');

const TOKEN_PREFIX = 'token:';
const tokenNode = name => `${TOKEN_PREFIX}${name}`;

// Ex.: components/po-field/po-combo/po-combo.css → components/po-field/po-combo
//      themes/po-theme-default.css → themes/po-theme-default
//      token:--color-action-default → tokens
function unitOf(relPath) {
  if (relPath.startsWith(TOKEN_PREFIX)) {
    return 'tokens';
  }

  const seg = relPath.split('/');
  if (seg.length === 1) {
    return 'root';
  }

  if (seg[0] === 'components') {
    if (seg.length === 2) {
      return 'components';
    }
    if (seg[1] === 'po-field') {
      return seg.length === 3 ? 'components/po-field' : `components/po-field/${seg[2]}`;
    }
    return `components/${seg[1]}`;
  }

  if (seg.length === 2) {
    return seg[1] === 'index.css' ? seg[0] : `${seg[0]}/${seg[1].replace(/\.\w+$/, '')}`;
  }
  return `${seg[0]}/${seg[1]}`;
}

const displayName = unit => (unit.startsWith('components/') ? unit.split('/').pop() : unit);

const isThemeFile = relPath => relPath.startsWith('themes/');

module.exports = { toPosix, tokenNode, unitOf, displayName, isThemeFile };
