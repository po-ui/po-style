# Code Review — AI Readiness (po-style)

**Data:** 2026-03-25
**Repositório:** po-ui/po-style
**PR:** [#883](https://github.com/po-ui/po-style/pull/883)

---

## Sumário Executivo

| Critério | Status |
|----------|--------|
| Design System & Tokens | Implementado |
| Proibição de valores hard-coded | Implementado |
| Estados de componentes | Implementado |
| Sincronização cross-repo | Implementado |
| Engenharia e Qualidade | Implementado |

## Critérios de Aceite Verificados

### 1. Design System & Tokens

- **Proibição de valores hard-coded**: Explícita — NÃO usar `#hex`, `rgb()`, `rgba()`, `hsl()`, espaçamentos literais, tipografia literal
- **Uso exclusivo de CSS Variables**: Obrigatório — todo valor visual DEVE referenciar variável CSS de `po-theme-default.css`
- **Nomenclatura de tokens**: Padrão `--{categoria}-{propriedade}-{variante}` documentado
- **Criação de novos tokens**: Se o token não existir, criar primeiro no tema antes de usar no componente

### 2. Estados de Componentes

- **Estados mapeados**: Enable, Disable, Static, Hover, Focus, Active, Loading
- **Validação de design**: Componente sem todos os estados especificados NÃO deve ser desenvolvido

### 3. Sincronização Cross-Repo

- **Espelhamento documentado**: `src/css/themes/po-theme-default.css` ↔ `src/po-theme-custom.css` do `totvs/po-theme-totvs`
- **Regra explícita**: Alterações em um DEVEM ser replicadas no outro

### 4. Engenharia e Qualidade

- **Conventional Commits**: Padrão `<type>(scope): <descrição curta>` documentado
- **Linguagem canônica**: Instruções em modo imperativo

## Arquivos de AI Readiness

| Arquivo | Propósito |
|---------|-----------|
| `AGENTS.md` | Ponto de entrada para agentes de IA |
| `.github/instructions/agents-instructions.md` | Instruções completas de desenvolvimento |
| `.github/skills/create-component-style.md` | Skill para criação de estilos de componentes |
| `.github/skills/implement-animalia-ds.md` | Skill para implementação do Animalia DS |
| `mcp.json` | Configuração de MCP servers (Figma) |
