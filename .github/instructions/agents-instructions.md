# PO Style - Instruções para AI Coding Agents

## Visão Geral do Projeto

PO Style é a biblioteca de tema/estilo CSS para o design system PO UI. Ela fornece:
- **Sistema de tema**: CSS custom properties (variáveis) para temas customizáveis
- **Estilos de componentes**: 40+ folhas de estilo de componentes UI (buttons, modals, tables, etc.)
- **Ferramenta CLI** (`@po-ui/theme-cli`): Cria estrutura de projetos de tema customizados
- **Saídas de build**: Bundles modernos (`po-theme-core.min.css`) e legados (`po-theme-default.min.css`)

## Arquitetura & Sistema de Build

### Pipeline de Processamento CSS (Gulp + PostCSS)

O build usa **plugins PostCSS** para transformar CSS com sintaxe especial:

1. **`postcss-import`**: Resolve declarações `@import` recursivamente
2. **`postcss-apply`**: Aplica conjuntos de CSS custom properties (sintaxe deprecada)
3. **`postcss-nested`**: Desdobra seletores aninhados
4. **`postcss-simple-vars`**: Substitui `$variables` por valores (ex.: `${theme}` → nome do tema)
5. **`autoprefixer`**: Adiciona prefixos de vendor
6. **`cssnano`**: Minifica a saída

**Padrão chave**: `src/css/index.css` usa a variável placeholder `${theme}` substituída em tempo de build:
```css
@import './themes/po-theme-${theme}.css';  /* becomes po-theme-default.css */
```

### Padrão de Estrutura de Arquivos

Cada componente segue esta estrutura:
```
src/css/components/po-button/
├── index.css          # Imports po-button.css
├── po-button.css      # Actual styles with CSS variables
└── po-button.html     # Visual test/sample markup
```

**Arquivos HTML NÃO são templates** - são páginas de teste estáticas servidas por `http-server` durante o desenvolvimento.

### Dois Modos de Build

1. **Legacy** (`index.css`): Agrupa variáveis de tema + estilos de componentes juntos
2. **Modern** (`index-modern.css`): Apenas estilos de componentes; espera variáveis de tema externas

Os consumidores escolhem como carregar temas (veja `src/css/README.md` e `docs/guides/theme-customization.md`).

## Fluxos de Trabalho de Desenvolvimento

### Executando Desenvolvimento Local

**Para desenvolvimento standalone do po-style** (com páginas HTML de teste):
```bash
npm install
npm run watch -- --theme default   # Watch mode (default theme) + builds test app
npm run watch -- --theme green     # Custom theme (uses po-theme-green.css)
npm run dev                        # Start http-server on ./app-dist
```

**Para testes de integração com po-angular** (recomendado):
```bash
npm run watch:css -- --theme default   # Watch CSS only, outputs to dist/
# Then point your po-angular app to ./dist/style/css/
```

**Principais diferenças**:
- `npm run watch`: Constrói aplicação de teste completa em `app-dist/` (inclui páginas HTML de teste, JS, assets)
- `npm run watch:css`: Constrói apenas CSS em `dist/style/` (mais rápido, para integração com po-angular)

### Adicionando/Modificando Componentes

1. Crie a pasta: `src/css/components/po-newcomponent/`
2. Adicione os arquivos: `index.css`, `po-newcomponent.css`, `po-newcomponent.html`
3. Importe em `src/css/components/index.css`: `@import './po-newcomponent';`
4. Use as variáveis CSS de `src/css/themes/po-global-tokens.css`
5. Teste navegando para `http://localhost:8080/css/components/po-newcomponent/po-newcomponent.html`

### Build para Produção

```bash
npm run build              # Full build: dist/style/ (default theme) + CLI
npm run build:css          # CSS only: dist/style/ (faster, no CLI build)
npm run build -- --theme green   # Custom theme variant
npm run build:cli          # Builds CLI tool to dist/cli/
```

## Convenções CSS

### Sistema de Tokens (CSS Variables)

- **Tokens globais**: Definidos em `src/css/themes/po-global-tokens.css`
  - Colors: `--color-action-default`, `--color-feedback-negative-base`
  - Spacing: `--spacing-sm`, `--spacing-md` (from po-spacing)
  - Typography: `--font-family`, `--font-size-default`
  - Borders: `--border-radius-md`, `--border-width-sm`
  - Shadows: `--shadow-sm`, `--shadow-lg`

- **Variáveis em nível de componente**: Sobrescreva no CSS do componente usando `var()`:
  ```css
  .po-button[p-kind='primary'] {
    color: var(--text-color);
    background-color: var(--color);
    border-color: var(--border-color);
  }
  ```

### Convenções de Nomenclatura

- Component classes: `po-{component}` (e.g., `po-button`, `po-modal`)
- Modifiers: `po-{component}-{modifier}` (e.g., `po-button-primary`, `po-button-sm`)
- State classes: `po-{component}-{state}` (e.g., `po-button-disabled`)
- Utility classes: Use existing from `src/css/commons/` (e.g., `po-text-ellipsis`)
- Accessibility variants: `po-{component}-aa` (classes for AA/AAA modes)

### Acessibilidade (Modos AA/AAA)

O PO UI suporta níveis de acessibilidade WCAG via atributo `data-a11y` no elemento raiz:

- **Modo AAA** (padrão): `data-a11y='AAA'` - Padrões de acessibilidade mais altos
  - Touch targets: `--target-size-aaa` (2.75rem / 44px)
  - Focus indicators: `--focus-aaa` (4px)
  
- **Modo AA**: `data-a11y='AA'` - Conformidade de acessibilidade padrão
  - Touch targets: `--target-size-aa` (2rem / 32px)
  - Focus indicators: `--focus-aa` (2px)

**Padrão**: Componentes definem estilos base com padrões AAA, depois sobrescrevem para modo AA:
```css
.po-button,
[data-a11y='AAA'] .po-button-aa {
  min-height: var(--target-size-aaa);  /* 44px default */
}

.po-button-aa {
  min-height: var(--target-size-aa);   /* 32px for AA mode */
}

[data-a11y='AA'] .po-button[p-size='small'] {
  /* Override small size for AA mode */
}
```

**Importante**: 
- Todos os elementos interativos devem usar `--target-size-aaa` por padrão
- Crie variantes `-aa` para componentes que precisam de dimensionamento diferente
- O atributo `data-a11y` é definido no nível da aplicação pelo po-angular

## Integração com po-angular

**Relação crítica**: Este repositório (`po-style`) fornece TODOS os estilos consumidos pelo `po-angular` (a biblioteca de componentes Angular).

- **po-style** é uma **dependência** do po-angular
- Componentes Angular geram estrutura HTML com nomes de classes (e.g., `.po-button`, `.po-modal`)
- Este repositório define o CSS para essas classes
- **Mudanças de CSS com breaking changes aqui impactam componentes Angular** - coordene com a equipe do po-angular

### Fluxo de Trabalho Entre Repositórios

Ao adicionar/modificar estilos de componentes:
1. **Garanta que os nomes de classes correspondam** aos templates de componentes Angular no po-angular
2. **Teste a integração**: Vincule o build local do po-style no po-angular via `npm link` ou registro local
3. **Códigos hex de ícones**: Componentes como checkbox, radio, table usam valores hex hardcoded (e.g., `po-icon-ok`, `po-icon-minus`) - não mude sem atualizar o po-angular
4. **Alinhamento de versão**: po-angular depende de versões específicas do po-style - verifique `package.json` no po-angular

### Testando com po-angular

```bash
# In po-style
npm run build
npm pack
# or: npm run publish:style:local  # Publishes to local registry at localhost:4873

# In po-angular (separate repo)
npm install /path/to/po-style-tarball.tgz
# or: npm install @po-ui/style --registry http://localhost:4873
```

## Arquitetura da Ferramenta CLI

Localizada em `src/cli/`, publicada como `@po-ui/theme-cli`:

- **Commands**: `po-theme new <name>`, `po-theme build`
- **Scaffolding**: Cria projeto com `src/po-theme-custom.css` + package.json
- **Build**: Usa gulp + postcss-custom-properties para compilar temas customizados

## Gerenciamento de Ícones

## Integração com Animalia Icons

Atualizar conjunto de ícones externo:
```bash
npm run update-animalia-icon   # Updates @animaliads/animalia-icon, runs sync script
```

Script: `scripts/update-animalia-icon.js`

## Controle de Versão & Release

- **Commits**: Angular conventional commits (enforced by commitlint)
- **Versioning**: `npm run release` usa standard-version (auto-gera CHANGELOG)
- **Publishing**: Manual via `npm run pack:style` depois publish de `dist/style/`

## Testes

Sem testes automatizados. Testes visuais via:
1. Execute arquivos HTML de componentes no navegador durante `npm run watch`
2. Verifique estados do componente (enable, disable, hover, focus, active)

**Requisito de design**: Componentes DEVEM ter todos os 6 estados definidos antes do desenvolvimento.

## Referência de Arquivos Chave

- `gulpfile.js`: Todas as tasks de build (150+ linhas de config Gulp + PostCSS)
- `package.json`: Scripts principais e dependências
- `src/css/themes/po-global-tokens.css`: Definições master de tokens
- `src/css/index.css` / `index-modern.css`: Pontos de entrada do build
- `src/cli/src/new.js`: Lógica de scaffolding do CLI de tema
- `commitlint.config.js`: Força formato de commit Angular

## Armadilhas Comuns

1. **Não edite arquivos em `dist/` ou `app-dist/`** - eles são gerados
2. **Ícones SVG devem ser otimizados com SVGO** antes de adicionar em `src/assets/icons/`
3. **Parâmetro de nome do tema** afeta pasta de saída: `dist/style-green/` para `--theme green`
4. **CSS variables requerem navegador moderno** - build legacy compila para valores estáticos
5. **Arquivos HTML são apenas para preview** - componentes Angular consomem o CSS separadamente
6. **Mudanças em nomes de classes CSS são BREAKING** - componentes Angular dependem de nomes de classes exatos (e.g., `.po-button-label`, `.po-icon`)
7. **Mudanças em códigos hex de ícones requerem updates no po-angular** - componentes checkbox, radio, table tem valores de ícones hardcoded
