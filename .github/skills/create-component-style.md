# Skill: Criar Estilo de Componente

## Descrição
Cria o estilo CSS de um novo componente PO UI.

## Passos
1. Criar pasta `src/css/components/po-<nome>/`
2. Criar `po-<nome>.css` com estilos do componente
3. Criar `po-<nome>.html` com preview do componente
4. Adicionar link no `index.html` para preview
5. Garantir que todos os estados estejam cobertos:
   - Enable, Disable, Static, Hover, Focus, Active, Loading

## Convenções
- Prefixo `po-` em todas as classes
- Usar variáveis CSS do tema (ex: `var(--color-action-default)`)
- Usar PostCSS features: nesting, simple-vars, apply
- Consultar especificação do Animalia DS: https://doc.animaliads.io/docs/components/
