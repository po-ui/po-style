# Nota de desenvolvimento — Build CSS do tema deprecated

**Data:** 2026-10-21

## Decisão

O build da biblioteca (`gulp build` → tarefa `buildTheme`) passou a gerar os
entregáveis do arquivo de tokens deprecated `src/css/themes/po-theme-default-deprecated.css`,
em **paridade total** com o trio já existente do `po-theme-default`.

Saídas adicionadas em `dist/style/css/`:

| Arquivo | Conteúdo | Par equivalente (default) |
|---|---|---|
| `po-theme-default-deprecated.min.css` | Bundle completo minificado (tokens globais + tema deprecated + commons + components + services) | `po-theme-default.min.css` |
| `po-theme-default-deprecated-variables.css` | Cópia crua só das variáveis | `po-theme-default-variables.css` |
| `po-theme-default-deprecated-variables.min.css` | Minificação só das variáveis | `po-theme-default-variables.min.css` |

## Como foi implementado

- Criado `src/css/index-deprecated.css`, espelhando o `index.css` mas importando
  **apenas** `./themes/po-theme-default-deprecated.css` como camada de tema
  (sem concatenar `po-theme-default.css`).
- Adicionadas três tarefas no `gulpfile.js`, encaixadas nas fases `parallel` do `buildTheme`:
  - `copyThemeDeprecatedVariablesCss` (fase 1 — cópia crua, espelha `copyThemeVariablesCss`)
  - `buildThemeDeprecatedVariablesCss` (fase 2 — minificação a partir do `.temp`, espelha `buildThemeVariablesCss`)
  - `buildThemeDeprecatedCssLegacy` (fase 2 — bundle completo a partir do `index-deprecated.css`, espelha `buildThemeCssLegacy`)

## Escopo e limites

- Vale **apenas** para o build da biblioteca. Não entra em dev/watch
  (`build:css`, `watch:css`, `buildDevThemeCss`) nem no app de testes.
- O arquivo deprecated é fixo do tema default: é copiado **independente de `--theme`**,
  sem interpolar o nome do tema.
- Sem ADR: é extensão direta de um padrão já existente, reversível, sem trade-off
  arquitetural.
