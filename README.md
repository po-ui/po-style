# Introdução

Repositório de estilo do PO UI.

Esse repositório é usado para atualizar os estilos que devem ser utilizados como base por todos os projetos 
do PO UI.

# Processo de design

Antes de desenvolver um novo componente, verifique se o protótipo tem a especificação para os seguintes status:

- Enable
- Disable
- Static
- Hover
- Focus
- Active

> Quando um componente não tem um destes estados, ele **não deve ser desenvolvido**.

# Como iniciar

1. Instale as dependências
`npm install` ou `yarn`

2. Fica observando alterações no projeto e recria o build do projeto em tempo de desenvolvimento
`npm run watch` ou `yarn watch`

    - Quando você deseja especificar um tema, é necessário adicionar
    `-- --theme <nomedotema>`

    **Exemplo**: `npm run watch -- --theme green`
    
    **Nome do tema**: é o sufixo relacionado ao arquivo `po-theme-<sufixo>.css`, localizado em `src/app/css/themes`;

3. Inicia o servidor (http-server) para testar o projeto
`npm run dev` ou `yarn dev`

    - Utilizando o `npm run watch` e o `npm run dev`, a cada alteração, apenas dê o refresh na página para visualizar a mesma;


Outros scripts:
* Faz o build do projeto
`npm run build` ou `yarn build`
    * Também é possível informar um tema específico adicionando `-- --theme <nomedotema>`

# Contribuição

Siga as `convenções de nomenclatura` abaixo:

O objetivo principal é continuar desenvolvendo os componentes, tornando-os mais simples de usar em qualquer projeto. O desenvolvimento 
dos estilos é aberto para todos os desenvolvedores e agradecemos aos desenvolvedores que contribuem com melhorias e correções de erros.

Leia abaixo para saber como você pode participar na melhoria dos estilos.

### Steps

1. Crie um template HTML com o nome do componente em `src/css/components`
2. Crie um link em `index.html` para redirecionar para o preview do componente
3. Crie uma pasta com o nome do componente em `src/css/components`
4. Crie um arquivo `css` com o nome do componente

Em desenvolvimento ... 

### Exemplo de contribuição

Em desenvolvimento ... 

# Convenções de nomenclatura

### Utilitários

Em desenvolvimento ...

### Componentes

Em desenvolvimento ...

### Assets

Instalar [SVGO](https://github.com/svg/svgo) para otimizar arquivos SVG.

`$ [sudo] npm install -g svgo`

> **Arquivos SVG precisam ser otimizados antes de serem adicionados ao projeto**
