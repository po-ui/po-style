# Análise de impacto de PR

Executada pelo workflow [`pr-analysis.yml`](../../workflows/pr-analysis.yml) na **abertura** de cada Pull Request.
Analisa apenas `src/css` e publica:

- **Discord:** resumo em embed (tipo, risco, unidades alteradas, impacto, pontos de atenção e onde testar);
- **PR:** comentário com o relatório completo e checklist das prévias para o teste.

## Como funciona

No po-style não existe componente que dependa de outro componente (isso fica no po-angular). O impacto
de uma mudança vem dos **tokens** (variáveis CSS) e dos **seletores** que uma unidade escreve para outra.

1. Lista os arquivos alterados pela API do GitHub (o código da PR **não** é baixado nem executado).
2. Agrupa as alterações em unidades: `components/<componente>`, `components/po-field/<campo>`,
   `commons/<pasta>`, `services/<serviço>` e `themes/<tema>`.
   No `po-theme-default.css`, cada linha alterada pertence ao bloco em que está:
   `po-button { --color: ... }` conta como alteração do `po-button`; os blocos `:root` contam como tokens globais.
3. Monta, a partir da branch base, o grafo de dependências:
   - **tokens globais** (definidos em `:root`): quem usa `var(--token)` ou `@apply --mixin` depende do token,
     inclusive outros tokens (`--color-action-default: var(--color-brand-01-base)`).
     Unidades que redefinem o token no próprio escopo não dependem do valor global;
   - **seletores de outra unidade**: se `po-table.css` estiliza `.po-button`, mudanças nas regras do
     `po-button` impactam o `po-table`. O nome é resolvido pelo maior prefixo conhecido
     (`.po-button-group-container` → `po-button-group`).

   O impacto não se propaga em cadeia entre componentes: quem estiliza o `po-table` não é afetado por uma mudança
   no `po-button`. Tokens propagam pelos tokens derivados; esses consumidores aparecem como "via tokens derivados".
4. Regras alteradas cujo contexto é outra unidade também a impactam: `po-timepicker .po-x { ... }` em
   `po-input.css` impacta o `po-timepicker`. Só o primeiro composto do seletor conta como contexto, então
   `.po-tree-view-item .po-button` impacta apenas o próprio `po-tree-view`.
5. Classifica cada alteração: tokens/tema, estilo, imports (`index.css`), prévia (html), script ou documentação
   (diffs só de comentário contam como documentação).
6. Detecta tokens adicionados e removidos e classes removidas/renomeadas (possível breaking change).
7. Calcula o risco por unidade alterada:

   | Critério | Pontos |
   |---|---|
   | Alteração funcional (fora de prévias/docs) | +1 |
   | 3+ / 10+ / 25+ unidades impactadas | +1 / +2 / +3 |
   | Token, classe ou arquivo removido | +2 |
   | Alteração em `index.css` | +1 |

   Resultado: até 1 ponto → 🟢 baixo · 2-3 → 🟡 médio · 4+ → 🔴 alto. O risco da PR é o maior entre as unidades.

8. "Onde testar" lista as prévias do app de desenvolvimento (`src/app/components.json`) das unidades alteradas e
   dos consumidores diretos.
9. Se o `po-theme-default.css` for alterado, lembra de replicar a mudança no `po-theme-totvs`.

## Executando localmente

```bash
node .github/scripts/pr-impact/pr-impact.js --base origin/master --out-dir pr-impact
```

Gera `pr-impact/report.md`, `pr-impact/discord.json` e `pr-impact/report.json`.
Use `--head <ref>` para analisar outro commit/branch e as variáveis `PR_TITLE`, `PR_AUTHOR`, `PR_URL` e
`PR_NUMBER` para preencher os metadados. O grafo é lido da pasta atual, então rode a partir da branch base.

Para testar o workflow em um fork, ele precisa estar na branch padrão do fork: o GitHub sempre lê o
workflow de `pull_request_target` da branch padrão, qualquer que seja a base da PR.

## Testes

```bash
node --test ".github/scripts/pr-impact/test/*.test.js"
```

Executados no CI pelo job `test-pr-impact`.

## Estrutura

| Arquivo | Responsabilidade |
|---|---|
| `pr-impact.js` | Entrada: lê os argumentos, executa a análise e grava as saídas |
| `lib/constants.js` | Caminhos, rótulos e níveis de risco |
| `lib/units.js` | Converte o caminho de um arquivo (ou nó do grafo) na unidade |
| `lib/css.js` | Leitura simplificada de CSS: pilha de seletores por linha, tokens e nomes `po-*` |
| `lib/graph.js` | Grafo de tokens e seletores e propagação do impacto |
| `lib/changed-files.js` | Leitura do diff (API do GitHub ou git), escopo de cada linha e segmentos por unidade |
| `lib/analyze.js` | Cruza os segmentos com o grafo e calcula o risco |
| `lib/format.js` | Helpers de texto e pontos de atenção |
| `lib/markdown.js` | Comentário da PR |
| `lib/discord.js` | Embed do Discord |

## Limitações

- O grafo é gerado a partir da branch base: unidades e tokens criados na própria PR aparecem sem consumidores.
- O escopo das linhas adicionadas é deduzido do ponto de inserção na base e das chaves do próprio diff.
- A unidade é a pasta do componente: uma mudança em `po-page-slide` conta como `po-page`.
- Arquivos fora de `src/css` (ícones, app, CLI, build) são listados, mas não analisados.
- Arquivos muito grandes podem vir sem `patch` da API; nesse caso a classificação usa apenas o caminho.
- Se a análise falhar, o Discord recebe a notificação simples (autor, título e link).
