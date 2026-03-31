# Skill: Implementar Definições do Animalia DS em Estilo de Componente

## Descrição
Implementa as definições visuais do Animalia DS no CSS de um componente PO UI.

## Passos
1. Consultar especificação em https://doc.animaliads.io/docs/components/<nome>/
2. Atualizar CSS em `src/css/components/po-<nome>/`
3. Garantir cobertura dos estados: Enable, Disable, Static, Hover, Focus, Active, Loading
4. Remover variáveis CSS legacy desnecessárias
5. Documentar variáveis removidas como BREAKING CHANGE

## Atualização de Ícones
Se necessário atualizar a biblioteca de ícones:
```bash
npm run update-animalia-icon
```
Isso copia fontes e CSS de `@animaliads/animalia-icon` para:
- `src/assets/icons/animalia-icon/` (fontes TTF/WOFF)
- `src/css/commons/po-icon/` (CSS)

## Convenções de Commit
```
feat(<componente>): implementa definições do AnimaliaDS

BREAKING CHANGES:
Remove variáveis para compatibilidade com @animaliads/<componente>
e melhorias de acessibilidade.

- `<variável-removida>`: descrição
```
