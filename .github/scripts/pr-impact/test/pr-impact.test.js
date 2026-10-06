const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { unitOf, displayName } = require('../lib/units');
const { parseCss, leadingNames, selectorNames, tokenUsages } = require('../lib/css');
const { collectImpact, resolveOwner } = require('../lib/graph');
const { changedLines, segmentsOf, apiChanges } = require('../lib/changed-files');
const { analyze } = require('../lib/analyze');
const { parseTitle } = require('../lib/format');
const { buildDiscordPayload } = require('../lib/discord');

const LIB = 'src/css';

const NAMES = new Map([
  ['po-button', 'components/po-button'],
  ['po-button-group', 'components/po-button-group'],
  ['po-input', 'components/po-field/po-input'],
  ['po-timepicker', 'components/po-field/po-timepicker'],
  ['po-listbox', 'components/po-listbox'],
  ['po-combo', 'components/po-field/po-combo']
]);

const graphOf = (edges, { sources = {}, previews = {} } = {}) => {
  const dependents = new Map();
  for (const [from, to] of edges) {
    dependents.set(to, new Set([...(dependents.get(to) || []), from]));
  }
  return {
    dependents,
    names: NAMES,
    sources: new Map(Object.entries(sources).map(([file, source]) => [file, parseCss(source)])),
    previews: new Map(Object.entries(previews))
  };
};

const changedFile = (relPath, patch = '', status = 'modified') => ({
  filename: `${LIB}/${relPath}`,
  status,
  additions: 1,
  deletions: 0,
  patch
});

const THEME = [
  ':root {',
  '  --color-action-default: var(--color-brand-01-base);',
  '}',
  '',
  'po-button {',
  '  --color: var(--color-action-default);',
  '}',
  '',
  'po-input, po-timepicker {',
  '  --border-color: var(--color-neutral-dark-70);',
  '}'
].join('\n');

describe('units:', () => {
  it('unitOf: should group files by component, including subfolders', () => {
    assert.equal(unitOf('components/po-page/po-page-slide/po-page-slide.css'), 'components/po-page');
  });

  it('unitOf: should split each po-field field into its own unit', () => {
    assert.equal(unitOf('components/po-field/po-combo/po-combo.css'), 'components/po-field/po-combo');
    assert.equal(unitOf('components/po-field/index.css'), 'components/po-field');
  });

  it('unitOf: should map themes, commons, tokens and virtual nodes', () => {
    assert.equal(unitOf('themes/po-theme-default.css'), 'themes/po-theme-default');
    assert.equal(unitOf('commons/po-reset.css'), 'commons/po-reset');
    assert.equal(unitOf('commons/po-icon/animalia-regular.css'), 'commons/po-icon');
    assert.equal(unitOf('token:--color-action-default'), 'tokens');
    assert.equal(unitOf('components/po-button/@theme'), 'components/po-button');
    assert.equal(unitOf('components/index.css'), 'components');
  });

  it('displayName: should return the component name or the unit path', () => {
    assert.equal(displayName('components/po-field/po-combo'), 'po-combo');
    assert.equal(displayName('commons/po-icon'), 'commons/po-icon');
  });
});

describe('css:', () => {
  it('parseCss: should track the selector stack of each line', () => {
    const parsed = parseCss(THEME);
    assert.deepEqual(parsed.during[6], ['po-button']);
    assert.deepEqual(parsed.after[7], []);
    assert.deepEqual(parsed.during[2], [':root']);
  });

  it('parseCss: should keep line numbers after multi-line comments', () => {
    const parsed = parseCss('/*\n  BUTTON\n*/\npo-button {\n  --x: 1;\n}');
    assert.deepEqual(parsed.during[5], ['po-button']);
  });

  it('tokenUsages: should return var() and @apply tokens', () => {
    assert.deepEqual(tokenUsages('color: var(--a, var(--b))'), ['--a', '--b']);
    assert.deepEqual(tokenUsages('@apply --font-text-bold'), ['--font-text-bold']);
  });

  it('selectorNames: should return po-* tags and classes, ignoring attribute values', () => {
    assert.deepEqual(selectorNames("po-button[p-kind='po-x'] .po-button-label"), ['po-button', 'po-button-label']);
  });

  it('leadingNames: should return only the context of each selector', () => {
    assert.deepEqual(leadingNames('po-popup po-listbox, .po-tree-view .po-button'), ['po-popup', 'po-tree-view']);
    assert.deepEqual(leadingNames('.po-drag-drop:has(.po-widget)'), ['po-drag-drop']);
  });
});

describe('graph:', () => {
  it('resolveOwner: should use the longest known prefix', () => {
    assert.equal(resolveOwner(NAMES, 'po-button-group-container'), 'components/po-button-group');
    assert.equal(resolveOwner(NAMES, 'po-button'), 'components/po-button');
    assert.equal(resolveOwner(NAMES, 'po-sm-6'), null);
  });

  const graph = graphOf([
    ['token:--color-action-default', 'token:--color-brand-01-base'],
    ['components/po-button/@theme', 'token:--color-action-default'],
    ['components/po-tag/po-tag.css', 'token:--color-brand-01-base'],
    ['components/po-button/@unit', 'components/po-button/po-button.css'],
    ['components/po-table/po-table.css', 'components/po-button/@unit'],
    ['components/po-table/@unit', 'components/po-table/po-table.css'],
    ['components/po-page/po-page.css', 'components/po-table/@unit']
  ]);

  it('collectImpact: should count token derivations as indirect impact', () => {
    const impact = collectImpact(graph, ['token:--color-brand-01-base']);
    assert.equal(impact.get('components/po-tag'), 1);
    assert.equal(impact.get('components/po-button'), 2);
  });

  it('collectImpact: should stop at the unit that styles the changed one', () => {
    const impact = collectImpact(graph, ['components/po-button/po-button.css']);
    assert.equal(impact.get('components/po-table'), 1);
    assert.ok(!impact.has('components/po-page'));
  });
});

describe('changed-files:', () => {
  const graph = graphOf([], { sources: { 'themes/po-theme-default.css': THEME } });

  it('changedLines: should take the scope of removed lines from the base file', () => {
    const patch = '@@ -6 +6 @@ po-button {\n-  --color: var(--color-action-default);\n+  --color: var(--color-x);';
    const lines = changedLines(patch, graph.sources.get('themes/po-theme-default.css'));
    assert.deepEqual(
      lines.map(l => l.scope),
      [['po-button'], ['po-button']]
    );
  });

  it('changedLines: should anchor hunks by content if the base moved since the merge-base', () => {
    const patch = [
      '@@ -2,3 +2,3 @@',
      ' po-button {',
      '-  --color: var(--color-action-default);',
      '+  --color: var(--color-x);',
      ' }'
    ].join('\n');
    const lines = changedLines(patch, graph.sources.get('themes/po-theme-default.css'));
    assert.deepEqual(lines[0].scope, ['po-button']);
  });

  it('changedLines: should open the scope of new blocks from the added lines', () => {
    const patch = '@@ -11,0 +12,3 @@\n+po-tag {\n+  --color: red;\n+}';
    const lines = changedLines(patch, graph.sources.get('themes/po-theme-default.css'));
    assert.deepEqual(lines[1].scope, ['po-tag']);
  });

  it('segmentsOf: should split theme changes by the owner of each block', () => {
    const patch = [
      '@@ -2 +2 @@',
      '-  --color-action-default: var(--color-brand-01-base);',
      '+  --color-action-default: var(--color-brand-01-dark);',
      '@@ -10 +10 @@',
      '-  --border-color: var(--color-neutral-dark-70);',
      '+  --border-color: var(--color-neutral-dark-80);'
    ].join('\n');
    const segments = segmentsOf('themes/po-theme-default.css', patch, graph);
    const byUnit = Object.fromEntries(segments.map(s => [s.unit, [...s.startNodes]]));
    assert.deepEqual(byUnit, {
      'themes/po-theme-default': ['token:--color-action-default'],
      'components/po-field/po-input': ['components/po-field/po-input/@theme'],
      'components/po-field/po-timepicker': ['components/po-field/po-timepicker/@theme']
    });
  });

  it('segmentsOf: should return the units styled in the context of the changed rule', () => {
    const source = 'po-timepicker .po-button-vertical-divider {\n  height: 24px;\n}';
    const patch = '@@ -2 +2 @@\n-  height: 24px;\n+  height: 20px;';
    const withSource = graphOf([], { sources: { 'components/po-field/po-input/po-input.css': source } });
    const [segment] = segmentsOf('components/po-field/po-input/po-input.css', patch, withSource);
    assert.deepEqual([...segment.targets], ['components/po-field/po-timepicker']);
  });

  it('segmentsOf: should return `doc` if only comments changed', () => {
    const [segment] = segmentsOf('components/po-button/po-button.css', '@@ -1 +1 @@\n-/* old */\n+/* new */', graph);
    assert.equal(segment.category, 'doc');
  });

  it('apiChanges: should return added and removed tokens and removed classes', () => {
    const lines = [
      { sign: '-', text: '  --old-token: 1px;' },
      { sign: '+', text: '  --new-token: 1px;' },
      { sign: '-', text: '.po-button-old,' },
      { sign: '-', text: '.po-button-kept {' },
      { sign: '+', text: '.po-button-kept {' }
    ];
    assert.deepEqual(apiChanges(lines), {
      addedTokens: ['--new-token'],
      removedTokens: ['--old-token'],
      removedClasses: ['po-button-old']
    });
  });
});

describe('analyze:', () => {
  const graph = graphOf(
    [
      ['components/po-listbox/@unit', 'components/po-listbox/po-listbox.css'],
      ['components/po-field/po-combo/po-combo.css', 'components/po-listbox/@unit']
    ],
    { previews: { 'components/po-field/po-combo': ['Po Combo'] } }
  );

  it('analyze: should list direct consumers and test targets', () => {
    const result = analyze(
      [changedFile('components/po-listbox/po-listbox.css', '@@ -1 +1 @@\n+.x { color: red; }')],
      graph
    );
    assert.deepEqual(result.directConsumers, ['po-combo']);
    assert.deepEqual(result.testTargets, [{ name: 'po-combo', previews: ['Po Combo'] }]);
    assert.equal(result.overallRisk, 'low');
  });

  it('analyze: should raise risk on possible breaking change', () => {
    const patch = '@@ -1 +0,0 @@\n-.po-listbox-old {';
    const result = analyze([changedFile('components/po-listbox/po-listbox.css', patch)], graph);
    assert.equal(result.overallRisk, 'medium');
    assert.deepEqual(result.changed[0].removedClasses, ['po-listbox-old']);
  });

  it('analyze: should keep low risk if only previews changed', () => {
    const result = analyze([changedFile('components/po-listbox/po-listbox.html', '+<div></div>')], graph);
    assert.equal(result.overallRisk, 'low');
    assert.deepEqual(result.directConsumers, []);
  });

  it('analyze: should flag changes in the default theme', () => {
    const result = analyze([changedFile('themes/po-theme-default.css', '')], graph);
    assert.ok(result.themeChanged);
  });

  it('analyze: should ignore files outside src/css', () => {
    const result = analyze(
      [{ filename: 'README.md', status: 'modified', additions: 1, deletions: 0, patch: '' }],
      graph
    );
    assert.equal(result.changed.length, 0);
    assert.equal(result.stats.outsideFiles, 1);
  });
});

describe('format and discord:', () => {
  it('parseTitle: should extract type and scope from a conventional title', () => {
    assert.deepEqual(parseTitle('fix(button): fix hover'), { type: 'fix', scope: 'button' });
    assert.deepEqual(parseTitle('Free title'), { type: '', scope: '' });
  });

  it('buildDiscordPayload: should keep the PR title as plain text', () => {
    const result = analyze([], graphOf([]));
    const payload = buildDiscordPayload(result, { title: 'fix: $(whoami) `x`', author: '', url: '', number: '1' });
    assert.equal(payload.embeds[0].title, '#1 fix: $(whoami) `x`');
  });
});
