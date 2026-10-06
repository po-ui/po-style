/** Configurações compartilhadas: caminhos, rótulos e níveis de risco. */

const LIB_DIR = 'src/css';
const APP_COMPONENTS = 'src/app/components.json';
const THEME_DEFAULT = 'themes/po-theme-default.css';

// Unidades que só agregam código (index.css) ou representam os tokens globais; não contam como impactadas.
const AGGREGATOR_UNITS = new Set(['root', 'components', 'commons', 'services', 'themes', 'tokens']);

const CATEGORY_LABELS = {
  tokens: 'tokens/tema',
  style: 'estilo',
  exports: 'imports (index.css)',
  script: 'script',
  preview: 'preview (html)',
  doc: 'documentação'
};

const NON_FUNCTIONAL = new Set(['preview', 'doc']);

const RISK = {
  low: { label: 'Baixo', emoji: '🟢', color: 0x2ecc71 },
  medium: { label: 'Médio', emoji: '🟡', color: 0xf1c40f },
  high: { label: 'Alto', emoji: '🔴', color: 0xe74c3c }
};

const RISK_ORDER = ['low', 'medium', 'high'];

module.exports = {
  LIB_DIR,
  APP_COMPONENTS,
  THEME_DEFAULT,
  AGGREGATOR_UNITS,
  CATEGORY_LABELS,
  NON_FUNCTIONAL,
  RISK,
  RISK_ORDER
};
