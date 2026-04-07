# PO UI Style - Instruções para AI Coding Agents

## Visão Geral do Projeto

PO UI Style é o repositório de estilos base do PO UI. Fornece o sistema de temas, tokens CSS e estilos de componentes usados por todas as aplicações PO UI. O pacote publicado é `@po-ui/style`.

**Arquitetura Principal:**
- **Pipeline de Build**: PostCSS (importCss → apply → nested → simpleVars → autoprefixer → cssnano) via Gulp
- **Sistema de Temas**: Temas definidos em `src/css/themes/po-theme-<nome>.css` com variáveis CSS
- **Saída**: CSS minificado em `dist/style/css/` (`po-theme-default.min.css`, `po-theme-core.min.css`)
- **CLI**: Ferramenta CLI em `src/cli/` para auxiliar na configuração de temas

## Idioma

- **Documentação**: Português formal e impessoal
- **Código fonte**: Inglês (nomes de classes CSS, variáveis, funções JS)
- **Nomes de classes CSS**: Prefixo `po-` (ex: `po-button`, `po-input`)

## Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Build completo (tema + CLI)
npm run build

# Build apenas CSS
npm run build:css

# Servidor de desenvolvimento
npm run dev

# Watch (recompila ao alterar CSS)
npm run watch

# Watch apenas CSS (sem app de teste)
npm run watch:css

# Verificar formatação
npm run format:check

# Formatar todos os arquivos
npm run format:all

# Build com tema específico
npm run build -- --theme green
```

## Estrutura de Pastas

```
src/
├── app/          # App de teste/preview dos componentes
├── assets/       # Ícones e recursos estáticos
├── cli/          # Ferramenta CLI para configuração de temas
└── css/
    ├── components/   # Estilos por componente (HTML de preview + CSS)
    ├── themes/       # Definições de temas (po-theme-default.css, etc.)
    └── index.css     # Entry point do CSS
```

## Pipeline de Build CSS

1. Arquivos CSS de `src/` são copiados para `.temp/`
2. Variável `${theme}` é substituída pelo nome do tema (default: `default`)
3. PostCSS processa: imports → apply → nested → simpleVars → autoprefixer → cssnano
4. Saída em `dist/style/css/`:
   - `po-theme-default.min.css` — Tema completo (legacy)
   - `po-theme-core.min.css` — Tema core (moderno)
   - `po-theme-default-variables.min.css` — Apenas variáveis do tema

## Convenções de Nomenclatura CSS

- Classes de componentes: `po-<nome>` (ex: `po-button`, `po-input`)
- Estados: `po-<nome>-<estado>` (ex: `po-button-disabled`, `po-input-focused`)
- Utilitários: `po-<utilidade>` (ex: `po-text-center`, `po-md-6`)

## Regras de Tokens CSS (OBRIGATÓRIO)

### PROIBIDO
- **Valores hard-coded de cor**: NÃO use `#hex`, `rgb()`, `rgba()`, `hsl()` diretamente em propriedades CSS. Use SEMPRE variáveis CSS: `var(--color-action-default)`, `var(--color-neutral-mid-40)`.
- **Valores hard-coded de espaçamento**: NÃO use `8px`, `16px`, `1rem` diretamente. Use tokens de espaçamento: `var(--spacing-sm)`, `var(--spacing-md)`.
- **Valores hard-coded de tipografia**: NÃO use `font-family: 'Arial'`, `font-size: 14px` diretamente. Use tokens: `var(--font-family-theme)`, `var(--font-size-default)`.

### OBRIGATÓRIO
- Todo valor visual DEVE referenciar uma CSS Variable definida em `src/css/themes/po-theme-default.css`.
- Se o token necessário não existir, crie-o primeiro no tema antes de usá-lo no componente.
- Ao criar novos tokens, siga a nomenclatura: `--{categoria}-{propriedade}-{variante}` (ex: `--color-action-hover`, `--spacing-inline-sm`).

## Sincronização com po-theme-totvs

O arquivo `src/css/themes/po-theme-default.css` deste repositório é **espelhado** no arquivo `src/po-theme-custom.css` do repositório `totvs/po-theme-totvs`. Alterações em um DEVEM ser replicadas no outro para manter consistência entre os temas.

## Animalia DS (Design System)

O `@po-ui/style` implementa os estilos CSS baseados nas definições do [Animalia DS](https://doc.animaliads.io/).

**Relação com o po-style:**
- Os estilos dos componentes seguem as especificações visuais do Animalia DS
- A biblioteca de ícones **Animalia Icons** (`@animaliads/animalia-icon`) é integrada via `scripts/update-animalia-icon.js`
- Fontes de ícones em `src/assets/icons/animalia-icon/` (TTF e WOFF)
- CSS de ícones em `src/css/commons/po-icon/` (`animalia-regular.css`, `animalia-fill.css`)
- Variáveis CSS legacy estão sendo progressivamente substituídas por tokens do Animalia DS

**Atualização de ícones:**
```bash
npm run update-animalia-icon  # Atualiza para a versão mais recente
```

**Ao implementar estilos de componentes:**
- Consulte a especificação do componente no Animalia DS
- Garanta cobertura dos estados: Enable, Disable, Static, Hover, Focus, Active, Loading
- Ao remover variáveis legacy, documente no CHANGELOG como BREAKING CHANGE

**Referências:**
- Documentação Animalia DS: https://doc.animaliads.io/
- Live demos: https://doc.animaliads.io/docs/components/

## Integração MCP — Ferramentas de Design

Para conectar agentes de IA às especificações de design do Animalia DS no Figma, configure o MCP do Figma no seu ambiente de desenvolvimento.

**Configuração sugerida para `mcp.json`:**
```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "<sua-chave-api-figma>"
      }
    }
  }
}
```

> **Nota:** A chave da API do Figma deve ser configurada como variável de ambiente, nunca embutida no código.

## Processo de Design

Antes de desenvolver um novo componente, verificar se o protótipo tem a especificação para os seguintes estados:
- Enable, Disable, Static, Hover, Focus, Active, Loading

> Componente sem todos os estados especificados não deve ser desenvolvido.

## Padrões de Commit (Angular conventional commits)

```
<type>(scope): <descrição curta>
```

**Types**: `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `build`  
**Scope**: Nome do componente **sem** o prefixo `po-` (ex: `feat(button)`, NÃO `feat(po-button)`)

## Contribuição

1. Criar pasta com nome do componente em `src/css/components/`
2. Criar template HTML do componente na pasta criada
3. Criar arquivo CSS com nome do componente na pasta criada
4. Criar link em `index.html` para preview
