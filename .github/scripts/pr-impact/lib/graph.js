/**
 * Monta o grafo de dependências do CSS e calcula até onde o impacto de uma mudança se propaga.
 *
 * Nós do grafo:
 * - arquivos CSS (components/po-button/po-button.css);
 * - tokens globais, definidos em :root (token:--color-action-default);
 * - `<unidade>/@theme`: bloco da unidade no arquivo de tema (po-button { --color: ... });
 * - `<unidade>/@unit`: a unidade como um todo, usada quando outra unidade estiliza os seletores dela.
 */

const fs = require('fs');
const path = require('path');
const { toPosix, tokenNode, unitOf, isThemeFile } = require('./units');
const css = require('./css');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else {
      files.push(toPosix(full));
    }
  }
  return files;
}

const isGraphSource = relPath => relPath.endsWith('.css') && path.basename(relPath) !== 'index.css';

/**
 * Índice nome → unidade, a partir das pastas e arquivos po-*.
 * Ex.: po-item-list → components/po-listbox, po-page-login → components/po-page.
 */
function buildNameIndex(allFiles) {
  const names = new Map();
  for (const file of allFiles.filter(f => /^(components|commons|services)\//.test(f))) {
    const unit = unitOf(file);
    const parts = file.split('/');
    parts[parts.length - 1] = parts[parts.length - 1].replace(/\.\w+$/, '');
    for (const name of parts.filter(p => p.startsWith('po-'))) {
      // O nome da própria unidade tem prioridade (po-button → components/po-button).
      if (!names.has(name) || (unit.endsWith(`/${name}`) && !names.get(name).endsWith(`/${name}`))) {
        names.set(name, unit);
      }
    }
  }
  return names;
}

// Resolve pelo maior prefixo conhecido: .po-button-group-container → components/po-button-group.
function resolveOwner(names, name) {
  for (let candidate = name; candidate.includes('-'); candidate = candidate.replace(/-[^-]*$/, '')) {
    if (names.has(candidate)) {
      return names.get(candidate);
    }
  }
  return null;
}

// Unidades donas de um bloco do tema: o primeiro composto de cada seletor (po-popup po-listbox → po-popup).
function themeOwners(names, scope) {
  const [first] = css.selectorsOf(scope);
  return [
    ...new Set(
      css
        .leadingNames(first || '')
        .map(n => resolveOwner(names, n))
        .filter(Boolean)
    )
  ];
}

// Nó(s) que "recebem" as declarações de um bloco.
function holdersOf(names, file, scope) {
  if (css.isRootScope(scope)) {
    const mixin = css.mixinOf(scope);
    return mixin ? [tokenNode(mixin)] : [];
  }
  if (isThemeFile(file)) {
    const owners = themeOwners(names, scope);
    return owners.length ? owners.map(u => `${u}/@theme`) : [file];
  }
  return [file];
}

/**
 * Nomes po-* citados pelos seletores de um bloco e quem os cita.
 * No tema, cada seletor da lista é avaliado separadamente: em "po-input, po-timepicker { ... }"
 * os dois compartilham tokens, mas um não estiliza o outro.
 */
function selectorRefs(names, file, scope) {
  const [first = '', ...nested] = css.selectorsOf(scope);
  const nestedNames = nested.flatMap(css.selectorNames);
  if (!isThemeFile(file)) {
    return [{ holders: [file], referenced: [...css.selectorNames(first), ...nestedNames] }];
  }
  return first.split(',').map(part => {
    const owners = css
      .leadingNames(part)
      .map(n => resolveOwner(names, n))
      .filter(Boolean);
    return {
      holders: owners.length ? owners.map(u => `${u}/@theme`) : [file],
      referenced: [...css.selectorNames(part), ...nestedNames]
    };
  });
}

// Prévias do app de desenvolvimento (src/app/components.json): unidade → títulos.
function readPreviews(appComponentsPath) {
  const previews = new Map();
  if (!appComponentsPath || !fs.existsSync(appComponentsPath)) {
    return previews;
  }
  const visit = items => {
    for (const item of items) {
      if (item.path && item.path.startsWith('./css/')) {
        const unit = unitOf(item.path.slice('./css/'.length));
        previews.set(unit, [...(previews.get(unit) || []), item.title]);
      }
      visit(item.subItems || []);
    }
  };
  visit(JSON.parse(fs.readFileSync(appComponentsPath, 'utf8')));
  return previews;
}

// Retorna nó → nós que dependem dele, o índice de nomes e as prévias por unidade.
function buildGraph(libDir, appComponentsPath) {
  const absLib = path.resolve(libDir);
  const allFiles = walk(absLib).map(f => toPosix(path.relative(absLib, f)));
  const names = buildNameIndex(allFiles);
  const sources = new Map(
    allFiles.filter(isGraphSource).map(f => [f, css.parseCss(fs.readFileSync(path.join(absLib, f), 'utf8'))])
  );

  // 1ª passada: tokens globais (:root) e tokens que cada unidade redefine no próprio escopo.
  const globalTokens = new Set();
  const scopedTokens = new Map();
  for (const [file, parsed] of sources) {
    for (const { scope } of parsed.blocks) {
      const mixin = css.isRootScope(scope) && css.mixinOf(scope);
      if (mixin) {
        globalTokens.add(mixin);
      }
    }
    for (const { scope, text } of parsed.statements) {
      const token = css.declaredToken(text);
      if (!token) {
        continue;
      }
      if (css.isRootScope(scope)) {
        globalTokens.add(token);
        continue;
      }
      for (const holder of holdersOf(names, file, scope)) {
        const unit = unitOf(holder);
        scopedTokens.set(unit, (scopedTokens.get(unit) || new Set()).add(token));
      }
    }
  }

  const dependents = new Map();
  const nodes = new Set();
  const addEdge = (from, to) => {
    if (!to || from === to) {
      return;
    }
    nodes.add(from);
    nodes.add(to);
    if (!dependents.has(to)) {
      dependents.set(to, new Set());
    }
    dependents.get(to).add(from);
  };

  // 2ª passada: uso de tokens (var/@apply) e seletores de outras unidades.
  for (const [file, parsed] of sources) {
    nodes.add(file);
    for (const { scope, text } of parsed.statements) {
      const declared = css.declaredToken(text);
      const holders =
        css.isRootScope(scope) && !css.mixinOf(scope)
          ? declared
            ? [tokenNode(declared)]
            : []
          : holdersOf(names, file, scope);

      for (const holder of holders) {
        const overrides = scopedTokens.get(unitOf(holder)) || new Set();
        for (const token of css.tokenUsages(text)) {
          if (globalTokens.has(token) && (holder.startsWith('token:') || !overrides.has(token))) {
            addEdge(holder, tokenNode(token));
          }
        }
      }
    }

    for (const { scope } of parsed.blocks) {
      if (css.isRootScope(scope)) {
        continue;
      }
      for (const { holders, referenced } of selectorRefs(names, file, scope)) {
        for (const holder of holders) {
          for (const owner of new Set(referenced.map(n => resolveOwner(names, n)))) {
            if (owner && owner !== unitOf(holder)) {
              addEdge(holder, `${owner}/@unit`);
            }
          }
        }
      }
    }
  }

  // As regras CSS de uma unidade afetam quem estiliza os seletores dela. Os tokens do bloco do tema
  // (po-page-slide { --x: ... }) mudam só valores da própria unidade e não entram aqui.
  for (const node of nodes) {
    if (!node.startsWith('token:') && !/\/@(unit|theme)$/.test(node)) {
      addEdge(`${unitOf(node)}/@unit`, node);
    }
  }

  return { dependents, names, previews: readPreviews(appComponentsPath), sources };
}

const isToken = node => node.startsWith('token:');

/**
 * Retorna unidade → distância (1 = consumidor direto).
 * - Dentro da mesma unidade o impacto se espalha sem aumentar a distância.
 * - Um token propaga para os tokens derivados dele (+1 a cada derivação) e para quem o usa.
 * - Outra unidade alcançada é o ponto final: no CSS não há componente que dependa de outro componente,
 *   então quem estiliza po-button não repassa a mudança para quem estiliza a si próprio.
 */
function collectImpact(graph, startNodes) {
  const best = new Map(startNodes.map(n => [n, 0]));
  const unitDistance = new Map();
  const queue = startNodes.map(node => ({ node, distance: 0, terminal: false }));

  while (queue.length) {
    const { node, distance, terminal } = queue.shift();
    if (best.get(node) < distance) {
      continue;
    }
    const unit = unitOf(node);
    if (!unitDistance.has(unit) || unitDistance.get(unit) > distance) {
      unitDistance.set(unit, distance);
    }
    if (terminal) {
      continue;
    }

    for (const consumer of graph.dependents.get(node) || []) {
      const sameUnit = !isToken(node) && unitOf(consumer) === unit;
      const next = {
        node: consumer,
        distance: sameUnit ? distance : distance + 1,
        terminal: !isToken(consumer) && !sameUnit
      };
      if (best.has(consumer) && best.get(consumer) <= next.distance) {
        continue;
      }
      best.set(consumer, next.distance);
      // Distância igual vai para a frente da fila (busca 0-1), mantendo as menores distâncias primeiro.
      sameUnit ? queue.unshift(next) : queue.push(next);
    }
  }
  return unitDistance;
}

module.exports = { buildGraph, collectImpact, resolveOwner, themeOwners };
