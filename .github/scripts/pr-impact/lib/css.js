/** Leitura simplificada de CSS: pilha de seletores por linha, declarações, tokens e seletores referenciados. */

const DECLARED_TOKEN = /^(--[\w-]+)\s*:/;
const MIXIN_SELECTOR = /^(--[\w-]+)\s*:?$/;
const TOKEN_USAGE = /var\(\s*(--[\w-]+)|@apply\s+(--[\w-]+)/g;
const TAG = /(?:^|[\s>+~,(])(po-[\w-]+)/g;
const CLASS = /\.(po-[\w-]+)/g;

// Remove comentários mantendo as quebras de linha, para não deslocar a numeração.
const stripComments = source => source.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ''));

/**
 * Percorre o CSS e retorna:
 * - statements: declarações com a pilha de seletores em que aparecem;
 * - blocks: cada bloco aberto, com a pilha que inclui o seu seletor;
 * - during/after: pilha mais profunda durante a linha e pilha ao final da linha (índice = número da linha);
 * - lines: linhas do arquivo sem comentários (índice = número da linha - 1);
 * - sourceLines: linhas originais, usadas para ancorar os hunks do diff (mesmo índice de lines).
 */
function parseCss(source) {
  const text = stripComments(source);
  const stack = [];
  const statements = [];
  const blocks = [];
  const during = [[], []];
  const after = [[]];
  let buffer = '';
  let line = 1;
  let startLine = 1;
  let parens = 0;

  const flush = () => {
    if (buffer.trim()) {
      statements.push({ scope: stack.slice(), text: buffer.trim(), line: startLine });
    }
    buffer = '';
  };

  for (const char of text) {
    if (char === '\n') {
      after[line] = stack.slice();
      line++;
      during[line] = stack.slice();
      buffer += char;
      continue;
    }
    if (!buffer.trim() && !/\s/.test(char)) {
      startLine = line;
    }
    if (char === '(') {
      parens++;
    } else if (char === ')') {
      parens = Math.max(0, parens - 1);
    }

    if (char === '{' && !parens) {
      stack.push(buffer.trim());
      blocks.push({ scope: stack.slice(), line: startLine });
      buffer = '';
      if (stack.length > during[line].length) {
        during[line] = stack.slice();
      }
    } else if (char === ';' && !parens) {
      flush();
    } else if (char === '}' && !parens) {
      flush();
      stack.pop();
    } else {
      buffer += char;
    }
  }
  after[line] = stack.slice();
  return { statements, blocks, during, after, lines: text.split('\n'), sourceLines: source.split('\n') };
}

const isAtRule = selector => selector.startsWith('@');

// Seletores "reais" da pilha, sem @media, @supports etc.
const selectorsOf = scope => scope.filter(s => !isAtRule(s));

const isRootScope = scope => {
  const [first] = selectorsOf(scope);
  return first === ':root' || first === 'html';
};

// Dentro de :root, um bloco "--nome {" é um mixin usado via @apply.
function mixinOf(scope) {
  const nested = selectorsOf(scope).slice(1);
  const match = nested.length && nested[0].match(MIXIN_SELECTOR);
  return match ? match[1] : null;
}

const declaredToken = text => (text.match(DECLARED_TOKEN) || [])[1] || null;

const tokenUsages = text => [...text.matchAll(TOKEN_USAGE)].map(m => m[1] || m[2]);

// Nomes po-* (tags e classes) citados em um seletor.
function selectorNames(selector) {
  const clean = selector.replace(/\[[^\]]*\]/g, '');
  return [...clean.matchAll(TAG), ...clean.matchAll(CLASS)].map(m => m[1]);
}

// Nomes do primeiro composto de cada seletor da lista: "po-popup po-listbox, .po-x" → ['po-popup', 'po-x'].
// O conteúdo de :has()/:not() só filtra o elemento e não conta como contexto.
const leadingCompound = selector =>
  selector
    .replace(/\([^)]*\)/g, '')
    .trim()
    .split(/[\s>+~]+/)[0];

function leadingNames(selector) {
  return selector.split(',').flatMap(s => selectorNames(` ${leadingCompound(s)}`));
}

module.exports = {
  stripComments,
  parseCss,
  selectorsOf,
  isRootScope,
  mixinOf,
  declaredToken,
  tokenUsages,
  selectorNames,
  leadingNames
};
