[comment]: # (@label Personalizando o Tema Padrão com Tokens CSS)
[comment]: # (@link guides/theme-customization)

> **⚠️ Atualização Importante para Versões 18+**  
> A partir da versão 18.X.X do PO-UI, recomendamos **fortemente** a utilização do `PoThemeService` para todas as customizações de temas, incluindo:
> 
> - Tokens globais (cores, tipografia, espaçamentos)  
> - Estilos específicos por componente  
> - Gerenciamento de dark/light mode  
> - Controle de acessibilidade (AA/AAA)  
> 
> **Benefícios:**  
> ✅ Maior consistência visual  
> ✅ Manutenção simplificada  
> ✅ Transições suaves entre temas  
> ✅ Suporte integrado a acessibilidade  
> 
> 📚 [Guia completo de Customização de Temas](guides/theme-service)

A partir da versão 1.9.0, o **PO UI** oferece a flexibilidade de personalização do tema padrão. Você pode ajustar várias propriedades como as cores, fonte, tamanho da fonte entre outros. Para isso, basta modificar os valores das variáveis utilizadas no CSS do tema padrão.

### Como o tema do PO UI funciona

Se você já tem uma aplicação que está usando o tema padrão do PO UI, você deve ter seu arquivo
`angular.json` configurado da seguinte maneira.

``` json
"styles": [
  // Arquivo com o tema do PO UI com as variáveis "compiladas"
  "node_modules/@po-ui/style/css/po-theme-default.min.css", 
  "src/styles.css"
],
```

Essa configuração usa o arquivo CSS minificado e *"compilado"*, ou seja, as variáveis do CSS foram
substituídas pelos valores hexadecimais correspondentes das cores usadas (entre outras coisas). Na prática 
e resumidamente falando, o que aconteceu com esse arquivo foi o seguinte:

``` css
/* Isso "compilando" ... */
po-button {
  --color: var(--color-action-default);
  --background-color: var(--color-transparent);
}

/* ... vira isso. */
.po-button{background-color: transparent;color: #753399;}
```

### Configurando sua aplicação para permitir personalização abrangente

Para possibilitar uma personalização abrangente, o *package* `@po-ui/style` agora disponibiliza os arquivos 
    contendo as variáveis CSS, bem como o arquivo de estilo sem a *"compilação"* das variáveis. Isso permite não apenas a modificação 
    das cores, mas também de outras propriedades via tokens. Para realizar essa configuração em seu projeto, é necessário carregar 
    esses novos arquivos, substituindo o arquivo anterior que restringia a modificação abrangente das cores.
``` json
"styles": [
  // Arquivo de variáveis (tema padrão)
  "node_modules/@po-ui/style/css/po-theme-default-variables.min.css",
  // Arquivo com os estilos sem as variáveis "compiladas"
  "node_modules/@po-ui/style/css/po-theme-core.min.css",
  "src/styles.css"
],
```

> Só isso não vai fazer diferença no seu projeto, as cores padrões ainda serão mantidas.

### Customizando Estilos no Seu Projeto

Para personalizar os estilos no seu projeto Angular, você pode criar um novo arquivo CSS ou editar um existente e
adicionar as seguintes linhas de código:

``` css
po-button {
    --color: rgb(43, 215, 60);
    --border-radius: 12px;
    --font-size: 16px;
    --background-color: black;
}
```

Só com isso já conseguimos dar uma nova cara para os nossos botões.

![Componente Button com a cor preta.][button-green-and-black]

Caso você queira customizar todas as cores é possível usar algumas das variáveis globais:

``` css
:root {
  --color-brand-01-base: red;
  --color-brand-02-base: green;
  --color-brand-03-base: blue;
}
```

![Exemplo dos componentes com as cores customizadas. Um botão azul, o componentes Tabs está com título
verde e o scroll da página na cor vermelha.][components-custom-colors]

Com essas personalizações, você terá controle não apenas sobre as cores, mas também sobre outros aspectos visuais dos componentes e templates em sua aplicação que utilizam o PO UI.

>Para descobrir quais variáveis você pode personalizar, consulte o arquivo 
`po-theme-default-variables.css` na pasta `node_modules/@po-ui/style/css`, Lá, você
encontrará uma lista completa de todas as variáveis utilizadas pelo tema padrão. Você também pode consultar a documentação de cada componente no próprio portal.

> Para customização do componenete `po-button` verificar [variáveis customizaveis][var-customized] na aba de customização.

> Atenção: Para saber quais browsers dão suporte a variáveis você pode consultar a ferramenta 
[Can I use][can-i-use].

[button-green-and-black]: ./assets/graphics/theme/button-green-and-black.png
[components-custom-colors]: ./assets/graphics/theme/components-custom-colors.png
[can-i-use]: https://caniuse.com/#search=CSS%20Variables
[var-customized]: https://doc.animaliads.io/docs/components/button/#live-demo
