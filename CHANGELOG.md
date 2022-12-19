# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [15.0.0-next.0](https://github.com/po-ui/po-style/compare/v14.12.2...v15.0.0-next.0) (2022-12-19)


### Code Refactoring

* **button:** remove a propriedade p-type ([c21b862](https://github.com/po-ui/po-style/commit/c21b862f01ed4b3ef13b15e9f9fb39a580fcde09))


### BREAKING CHANGES

* **button:** removida propriedade p-type

Foi removida a propriedade p-type do po-button pois a mesma foi depreciada na versão 15.x.x. Utilizar p-kind no lugar.



## [14.12.2](https://github.com/po-ui/po-style/compare/v14.12.1...v14.12.2) (2022-12-12)

Compatibilidade com @po-ui/ng-components@14.12.2



## [14.12.1](https://github.com/po-ui/po-style/compare/v14.12.0...v14.12.1) (2022-12-05)


### Bug Fixes

* **fields:** ajusta posicionamento do rich-text ([5127fcd](https://github.com/po-ui/po-style/commit/5127fcd8286930e03d3e1d19109a5d759794aab1))



# [14.12.0](https://github.com/po-ui/po-style/compare/v14.11.0...v14.12.0) (2022-12-05)


### Code Refactoring

* **switch:** remove variavel `--color-switch-color-label` ([266b3d0](https://github.com/po-ui/po-style/commit/266b3d00258e5aeec4768dd49097e5f98a4471ff))


### Features

* **disclaimer:** implementa definições Animalia DS ([f7ac404](https://github.com/po-ui/po-style/commit/f7ac40488661c4eadae94be687ac9377f9512675))
* **fields:** implementa definições do AnimaliaDS ([525c353](https://github.com/po-ui/po-style/commit/525c353f77b41aee667476b7a87652d5807ed706))
* **switch:** ajusta posicionamento ([0a554cc](https://github.com/po-ui/po-style/commit/0a554cc3f0f6db795f7d4bc221307776399a2d4f))
* **tooltip:** implementa definições do AnimaliaDS ([a0ed10c](https://github.com/po-ui/po-style/commit/a0ed10c3dff5dada3b8e4911feaf8f9ed61e1ed9))


### BREAKING CHANGES

* **switch:** removida variavel `--color-switch-color-label`

Foi removida a variavel `--color-switch-color-label` do po-switch pois ela não é mais utilizada, não sendo mais possivel customizar a cor da `label on` e `label off`. Pode ser customizada atraves da label.



## [14.11.0](https://github.com/po-ui/po-style/compare/v14.10.0...v14.11.0) (2022-11-28)


### Bug Fixes

* **datepicker:** ajuste estrutural ([950670d](https://github.com/po-ui/po-style/commit/950670de6ba34d48c49e0c8d507ace85717c1146)), closes [#1551](https://github.com/po-ui/po-style/issues/1551)



# [14.10.0](https://github.com/po-ui/po-style/compare/v14.9.1...v14.10.0) (2022-11-21)


### Features

* **datepicker:** implementa definições Animalia DS ([fdfeaa0](https://github.com/po-ui/po-style/commit/fdfeaa0cc7839572948e44f91dd41640b618d2e2))



## [14.9.1](https://github.com/po-ui/po-style/compare/v14.9.0...v14.9.1) (2022-11-14)

Compatibilidade com @po-ui/ng-components@14.9.1


# [14.9.0](https://github.com/po-ui/po-style/compare/v14.8.1...v14.9.0) (2022-11-07)


### Code Refactoring

* **container:** remove variáveis ([e5cf1ef](https://github.com/po-ui/po-style/commit/e5cf1ef1f4ed657dbeb4f3196d17fcb32807bccb))
* **tag:** remove variáveis ([f1e9190](https://github.com/po-ui/po-style/commit/f1e919099af0879d662e143166d879a03c2b392d))


### Features

* **container:** implementa definições do AnimaliaDS ([ae4ae2c](https://github.com/po-ui/po-style/commit/ae4ae2ce6d7e41ad946acb85352e48e12797a26a))
* **divider:** aplica estilo definido pelo DS ([40befb6](https://github.com/po-ui/po-style/commit/40befb68710c2361a31aa68dfbb099087a713093))
* **number:** implementa definições do AnimaliaDS ([d7969a6](https://github.com/po-ui/po-style/commit/d7969a6528a399891e1b2fb49d06ef4fbf854666))
* **po-image:** adiciona estilo ao componente ([805635d](https://github.com/po-ui/po-style/commit/805635da489b1df69fc0226a710188751a62f823))
* **tag:** aplica estilo definido pelo DS ([da2320b](https://github.com/po-ui/po-style/commit/da2320babf36a011029980ebc554197bab449f51))


### BREAKING CHANGES

* **tag:** removidas as variáveis:

--color-tag-border-color-dashed-focus
--color-tag-color
* **container:** removidas as variáveis:

--color-container-color-shadow - não existe mais shadow no container
--color-container-background-color-scrollbar - foi removida estilização da scrollbar por acessibilidade



## [14.8.1](https://github.com/po-ui/po-style/compare/v14.8.0...v14.8.1) (2022-10-31)


### Bug Fixes

* **select:** corrige renderização de conteúdo ([19f1780](https://github.com/po-ui/po-style/commit/19f1780b49b56340e6b2c390ba8e8fbccf1d09e0))
* **select:** corrige sobreposição  do conteúdo do select ([85ba7cb](https://github.com/po-ui/po-style/commit/85ba7cb66549c0c3917a3037369af0eaf7990eb9))



# [14.8.0](https://github.com/po-ui/po-style/compare/v14.7.1...v14.8.0) (2022-10-24)


### Features

* **label:** novo componente po-label ([bf7a936](https://github.com/po-ui/po-style/commit/bf7a93695521f005ca2a6e198a25265d3a7e1a9d))
* **radio-group:** remove propriedade outline ([1c8e943](https://github.com/po-ui/po-style/commit/1c8e9430b06abf76ace60e6e4e3c3176d55dee3b))
* **widget:** implementa definições do AnimaliaDS ([9f9b4b8](https://github.com/po-ui/po-style/commit/9f9b4b8dd4ab3f52d752dee4eb9a24c452da4813))



## [14.7.1](https://github.com/po-ui/po-style/compare/v14.7.0...v14.7.1) (2022-10-17)

Compatibilidade com @po-ui/ng-components@14.7.1


# [14.7.0](https://github.com/po-ui/po-style/compare/v14.6.0...v14.7.0) (2022-10-10)


### Bug Fixes

* **button:** remove outline em botão nativo ([0fc1b45](https://github.com/po-ui/po-style/commit/0fc1b45615be011523811f33721ff15fbb6f4a58))
* **icon:** ajuste na iconografia ([fb8793c](https://github.com/po-ui/po-style/commit/fb8793c7f4cf2226e2ee566b87d433afe7a8a28d))
* **rich-text:** ajustes na toolbar ([00a6c53](https://github.com/po-ui/po-style/commit/00a6c53ec96a4dea524164d86926eadb9a3386ad))


### Features

* **checkbox:** inclui p-size: large ([905f119](https://github.com/po-ui/po-style/commit/905f119b39ef1e0c1ac54e65f4405f1031b2ed5d))
* **link:** cria novo componente po-link ([510a768](https://github.com/po-ui/po-style/commit/510a7685ebe3705a217fe884522f6ffd80ab6c25))



# [14.6.0](https://github.com/po-ui/po-style/compare/v14.5.0...v14.6.0) (2022-10-03)


### Features

* **button-group:** aplica estilo definido pelo AnimaliaDS ([a6706a0](https://github.com/po-ui/po-style/commit/a6706a03b5af4d390bb87d628b36a48041a1d31d))



# [14.5.0](https://github.com/po-ui/po-style/compare/v14.4.0...v14.5.0) (2022-09-26)


### Bug Fixes

* **checkbox:** ajusta a posição do checkbox ([b804bd0](https://github.com/po-ui/po-style/commit/b804bd00b549d1d76e79148ad8b01fe693494645))
* **radio:** corrige os tokens do `po-radio` ([bd3de34](https://github.com/po-ui/po-style/commit/bd3de34e7b5106fce228e2663a1fafe3cc37583f))
* **table:** corrige posicionamento do gerenciador ([6ab30b7](https://github.com/po-ui/po-style/commit/6ab30b74a9236bd0e4517d01ce45fb350cf81f53))


### Features

* **fields:** inclui definições do AnimaliaDS ([e09b084](https://github.com/po-ui/po-style/commit/e09b08430fe62000876a635f76e76e92fc31e3ee))
* **radiogroup:** aplica estilo definido pelo DS ([dfc6e13](https://github.com/po-ui/po-style/commit/dfc6e13320530016237272c05e57df9def14a1ee))
* **select:** aplica estilo e acessibilidade definidos pelo DS ([c38f3b0](https://github.com/po-ui/po-style/commit/c38f3b04c88c20e12b740d3cc5907f6f476e4874))
* **textarea:** aplica estilo e acessibilidade definidos pelo DS ([c655f42](https://github.com/po-ui/po-style/commit/c655f4288e5b512f77be8b1efcc6e347ab0e65a6))


### BREAKING CHANGES

* **textarea:** removidas as variáveis

--color-textarea-color-disabled - não é possível mais customizar a cor de desabilitado
--color-textarea-text-error - não é possível customizar a cor do texto de erro
--color-textarea-background-color-scrollbar - não é possível mais customizar a cor do scrollbar
* **select:** removidas as variáveis:

--color-select-background-color-item-hover - não é possível mais customizar o efeito de hover no item.
--color-select-background-color-scrollbar - não é possível mais customizar a cor da barra de rolagem.
--color-select-button-disabled - não é mais necessário pois já se aplica à --color-select-background-color-disabled.
--color-select-color-selected - não é possível mais customizar a cor do item selecionado.
--color-select-background-color-unselected - não é possível mais customizar o select sem item selecionado.
--color-select-background-color-selected - não é possível mais customiza o select com item selecionado.
* **radiogroup:** removidas as variáveis:

--color-radio-group-border-color-input-error: var(--color-danger) - não é possível mais customizar por essa propriedade;
--color-radio-group-color-label-active: var(--color-white) - não é possível mais customizar por essa propriedade;



# [14.4.0](https://github.com/po-ui/po-style/compare/v14.3.1...v14.4.0) (2022-09-05)


### Code Refactoring

* **switch:** remove variáveis ([f42308b](https://github.com/po-ui/po-style/commit/f42308be035d438b48e2c3a41ff48e6c0706421a))


### Features

* **switch:** aplica estilo definido pelo DS ([b4542c6](https://github.com/po-ui/po-style/commit/b4542c61ada50005a58546bce8945d5faae09d21))


### BREAKING CHANGES

* **switch:** removidas as variáveis:

--color-switch-color-icon-off - não possui mais ícone no modo 'desligado'.
--color-switch-color-icon-disabled - não é possível mais customizar a cor do ícone desabilitado.



## [14.3.1](https://github.com/po-ui/po-style/compare/v14.3.0...v14.3.1) (2022-08-29)

Compatibilidade com @po-ui/ng-components@14.3.1


# [14.3.0](https://github.com/po-ui/po-style/compare/v14.2.1...v14.3.0) (2022-08-22)


### Features

* **button:** adiciona a propriedade `p-size` ([2353749](https://github.com/po-ui/po-style/commit/2353749d6be252abd1edaf977126b29d40da36c4))
* **button:** deprecia a propriedade `p-small` ([4690910](https://github.com/po-ui/po-style/commit/4690910a0494b5c09df4509622751c5a922a88f0))
* **checkbox-group:** reutiliza checkbox com novas definições ([29aca44](https://github.com/po-ui/po-style/commit/29aca44512076cfbcfa03e17742e61cdfa8db9ee))
* **checkbox:** altera posicionamento e outline ([8e66139](https://github.com/po-ui/po-style/commit/8e66139455c276c50a77312a731df2984a9b9929))
* **list-view:** altera padding do titulo ([0c2ad58](https://github.com/po-ui/po-style/commit/0c2ad5875ba8cac55d213935729675b84d441431))
* **table:** altera posicionamento do checkbox-group ([d9ed909](https://github.com/po-ui/po-style/commit/d9ed909401ac88d1df30bc3b72bc0e1d06fcbd69))



## [14.2.1](https://github.com/po-ui/po-style/compare/v14.2.0...v14.2.1) (2022-08-15)

Compatibilidade com @po-ui/ng-components@14.2.1


## [14.2.0](https://github.com/po-ui/po-style/compare/v14.1.0...v14.2.0) (2022-08-01)

Compatibilidade com @po-ui/ng-components@14.2.0

# [14.1.0](https://github.com/po-ui/po-style/compare/v14.0.0...v14.1.0) (2022-07-25)


### Bug Fixes

* **rich-text:** corrige o alinhamento dos botões ([ffda8d4](https://github.com/po-ui/po-style/commit/ffda8d452f58291caee2e9aab174f5d436489334))



# [14.0.0](https://github.com/po-ui/po-style/compare/v6.14.0...v14.0.0) (2022-07-18)


### Bug Fixes

* **table:** corrige quebra de colunas ([e2c105d](https://github.com/po-ui/po-style/commit/e2c105d3841f1197cf89d66866d2e6282d3719c5))


### Code Refactoring

* **components:** remove redimensionamentos conforme direcionamento para acessibilidade ([Ver mais](https://animaliads.notion.site/Bot-o-fb3a921e8ba54bd38b39758c24613368)) ([2669bec](https://github.com/po-ui/po-style/commit/2669bec0b95437ccaa5b7374e1e02d328a917eb5))


### Features

* **button:** inclui global e brand tokens ([052e9f8](https://github.com/po-ui/po-style/commit/052e9f8ac9972501a99e0cbcd93550025f3ab100))

* **toaster:** implementa para pequenas resoluções ([843d5fe](https://github.com/po-ui/po-style/commit/843d5fef2fe3c0360656692e8f9b219f8bc7085b))

* **tree-view:** ajusta estilo do `po-checkbox` ([44dfed0](https://github.com/po-ui/po-style/commit/44dfed0dd4be6303ebe9ff2b76830c9cd1ab64c7))


### BREAKING CHANGES

* **components:** removida a função @media screen

Foi removida a função @media screen por questões de acessibilidade.
([Ver mais](https://animaliads.notion.site/Bot-o-fb3a921e8ba54bd38b39758c24613368))


## [6.14.0](https://github.com/po-ui/po-style/compare/v6.13.1...v6.14.0) (2022-06-27)

Compatibilidade com @po-ui/ng-components@6.14.0

## [6.13.1](https://github.com/po-ui/po-style/compare/v6.13.0...v6.13.1) (2022-06-14)

Compatibilidade com @po-ui/ng-components@6.13.1

# [6.13.0](https://github.com/po-ui/po-style/compare/v6.12.1...v6.13.0) (2022-06-13)


### Features

* **button:** inclui estilo kind `primary danger` ([34cfb3b](https://github.com/po-ui/po-style/commit/34cfb3b6fc9d0fc8874dc2df968a6191cc14fc61))
* **list-view:** adiciona po-checkbox no `po-list-view` ([7c71045](https://github.com/po-ui/po-style/commit/7c71045f67d16cfe672d6dcdf6d5d20581aab0bd))
* **radio:** cria novo componente `po-radio` ([f644c72](https://github.com/po-ui/po-style/commit/f644c72d7010e710da78e0d4994fa9a0e363c3cc))
* **table:** insere estilo das setas do gerenciador ([307d188](https://github.com/po-ui/po-style/commit/307d188b36267217b95d853d7ec351938d374dfb))



## [6.12.1](https://github.com/po-ui/po-style/compare/v6.12.0...v6.12.1) (2022-06-06)


### Bug Fixes

* **button-group:** corrige quebra de linha ([9c2d683](https://github.com/po-ui/po-style/commit/9c2d6839b446f56ed70a63d643c32aa76f4f2c3c))



# [6.12.0](https://github.com/po-ui/po-style/compare/v6.11.0...v6.12.0) (2022-05-30)


### Features

* **table:** adiciona po-checkbox na po-table ([7b84ff8](https://github.com/po-ui/po-style/commit/7b84ff8ebbebedfe296eb3d88639705cb4482d1c))
* **table:** implementa virtual scroll ([b93b3a2](https://github.com/po-ui/po-style/commit/b93b3a27a4ae34b85ecb501a04c20d6703205643))
* **toaster:** aplica estilo e acessibilidade ([a2ee025](https://github.com/po-ui/po-style/commit/a2ee025d4e67702258d3c856e492b4859cca218e))



## [6.11.0](https://github.com/po-ui/po-style/compare/v6.10.1...v6.11.0) (2022-05-16)


### Bug Fixes

* **style:** corrige cursor pointer e warnings ([025a614](https://github.com/po-ui/po-style/commit/025a61489515bc54d08a7497d8d12d3e59f2d65c))



## [6.10.1](https://github.com/po-ui/po-style/compare/v6.10.0...v6.10.1) (2022-05-09)

Compatibilidade com @po-ui/ng-components@6.10.1


# [6.10.0](https://github.com/po-ui/po-style/compare/v6.9.0...v6.10.0) (2022-05-02)


### Features

* **button-group:** inclui nova definição de estilo ([b43a83c](https://github.com/po-ui/po-style/commit/b43a83c3602ac9d44fed25c7d5e25bb9041b6abb))

* **button:** inclui nova definição de estilo ([816a12c](https://github.com/po-ui/po-style/commit/816a12c21b89585fd0f46523f64a50400b6cb98f))

* **rich-text:** inclui nova definição de estilo ([e74e38c](https://github.com/po-ui/po-style/commit/e74e38c6a9919de65be9831be8bfd08822a7a42b))



# [6.9.0](https://github.com/po-ui/po-style/compare/v6.8.0...v6.9.0) (2022-04-18)


### Features

* **table:** fixa scroll vertical ([817475d](https://github.com/po-ui/po-style/commit/817475de44b1e48fc858502d7667e6169cc72457))



# [6.8.0](https://github.com/po-ui/po-style/compare/v6.7.0...v6.8.0) (2022-04-04)


### Features

* **checkbox:** melhora acessibilidade e contraste do componente ([2528225](https://github.com/po-ui/po-style/commit/2528225738139216c8777d0449e54671aaf757a2))



## [6.7.0](https://github.com/po-ui/po-style/compare/v6.6.0...v6.7.0) (2022-03-28)

Compatibilidade com @po-ui/ng-components@6.7.0


# [6.6.0](https://github.com/po-ui/po-style/compare/v6.5.1...v6.6.0) (2022-03-21)


Compatibilidade com @po-ui/ng-components@6.6.0

## [6.5.1](https://github.com/po-ui/po-style/compare/v6.5.0...v6.5.1) (2022-03-14)

Compatibilidade com @po-ui/ng-components@6.5.1

# [6.5.0](https://github.com/po-ui/po-style/compare/v6.4.0...v6.5.0) (2022-03-07)


### Features

* **menu:** melhora acessibilidade no menu ([120da08](https://github.com/po-ui/po-style/commit/120da0822deb1231cd7172b406cb8984c32d4cf4))



## [6.4.0](https://github.com/po-ui/po-style/compare/v6.3.0...v6.4.0) (2022-02-14)

Compatibilidade com @po-ui/ng-components@6.4.0


## [6.3.0](https://github.com/po-ui/po-style/compare/v6.2.0...v6.3.0) (2022-02-07)
Compatibilidade com @po-ui/ng-components@6.3.0


## [6.2.0](https://github.com/po-ui/po-style/compare/v6.1.0...v6.2.0) (2022-01-31)

Compatibilidade com @po-ui/ng-components@6.2.0

## [6.1.0](https://github.com/po-ui/po-style/compare/v6.0.0...v6.1.0) (2022-01-17)

Compatibilidade com @po-ui/ng-components@6.1.0


# [6.0.0](https://github.com/po-ui/po-style/compare/v6.0.0-rc.1...v6.0.0) (2021-12-13)

Compatibilidade com @po-ui/ng-components@6.0.0


## [6.0.0-rc.1](https://github.com/po-ui/po-style/compare/v5.22.1...6.0.0-rc.1) (2021-12-06)

Compatibilidade com @po-ui/ng-components@6.0.0-rc.1


## [5.22.1](https://github.com/po-ui/po-style/compare/v5.22.0...v5.22.1) (2021-11-29)

Compatibilidade com @po-ui/ng-components@5.22.1


# [5.22.0](https://github.com/po-ui/po-style/compare/v5.21.0...v5.22.0) (2021-11-22)

Compatibilidade com @po-ui/ng-components@5.22.0


# [5.21.0](https://github.com/po-ui/po-style/compare/v5.20.0...v5.21.0) (2021-11-16)

Compatibilidade com @po-ui/ng-components@5.21.0


# [5.20.0](https://github.com/po-ui/po-style/compare/v5.19.0...v5.20.0) (2021-11-05)


### Features

* **modal-footer:** adiciona estilo para o novo componente ([ef5e11c](https://github.com/po-ui/po-style/commit/ef5e11c1574b9b2a0d92cc5a44635ccc1c09f9c6))



# [5.19.0](https://github.com/po-ui/po-style/compare/v5.18.0...v5.19.0) (2021-11-01)


### Features

* **calendar:** adiciona botão `hoje` ([ba43a9a](https://github.com/po-ui/po-style/commit/ba43a9a8a5fd9b0ab131943ef929a74a93782a6c))



# [5.18.0](https://github.com/po-ui/po-style/compare/v5.17.0...v5.18.0) (2021-10-25)


### Features

* **lookup:** adiciona estilo para míltipla seleção ([6c85a78](https://github.com/po-ui/po-style/commit/6c85a780f9a779be4bec34a7cfb655c859941809))



## [5.17.0](https://github.com/po-ui/po-style/compare/v5.16.0...v5.17.0) (2021-10-18)


### Bug Fixes

* **datepicker-range:** corrige calendário ao abrir nas extremidades ([9cd28ed](https://github.com/po-ui/po-style/commit/9cd28ede67b3e63881816bae6f74767ba2df9f37))



# [5.16.0](https://github.com/po-ui/po-style/compare/v5.15.0...v5.16.0) (2021-10-11)


### Features

* **page:** ajustes de espaçamento no cabeçalho ([a41fe0f](https://github.com/po-ui/po-style/commit/a41fe0fdfa56188e5a41cc2d91b7c1a4851cf892))
* **stepper:** altera estilo do componente ([a76a324](https://github.com/po-ui/po-style/commit/a76a324f891e8d7a5b4c4765e353992f7d6f27ce))



## [5.15.0](https://github.com/po-ui/po-style/compare/v5.14.0...v5.15.0) (2021-10-04)

Compatibilidade com @po-ui/ng-components@5.15.0

# [5.14.0](https://github.com/po-ui/po-style/compare/v5.13.0...v5.14.0) (2021-09-27)

### Features

* **multiselect:** adiciona estilo de campo indeterminate ([5a90db8](https://github.com/po-ui/po-style/commit/5a90db86ea002938242ed4edbc78e2f8757b6a59))



# [5.13.1](https://github.com/po-ui/po-style/compare/v5.13.0...v5.13.1) (2021-09-20)


Compatibilidade com @po-ui/ng-components@5.13.1


## [5.13.0](https://github.com/po-ui/po-style/compare/v5.12.0...v5.13.0) (2021-09-13)

Compatibilidade com @po-ui/ng-components@5.13.0


# [5.12.0](https://github.com/po-ui/po-style/compare/v5.11.0...v5.12.0) (2021-09-06)


### Features

* **page-login:** adiciona classes para posicionamento dos fields ([92f8f5d](https://github.com/po-ui/po-style/commit/92f8f5d912cd95ccafc0096b45bae4cdd92ac620))



# [5.11.0](https://github.com/po-ui/po-style/compare/v5.10.0...v5.11.0) (2021-08-30)


### Features

* **calendar:** aplica estilo quando o mouse estiver sobre as datas que irão compor o range ([b576209](https://github.com/po-ui/po-style/commit/b57620964b48efab299a970248cdb6f88e4f4f61))



## [5.10.0](https://github.com/po-ui/po-style/compare/v5.9.0...v5.10.0) (2021-08-23)

Compatibilidade com @po-ui/ng-components@5.10.0


# [5.9.0](https://github.com/po-ui/po-style/compare/v5.8.0...v5.9.0) (2021-08-16)


### Features

* **multiselect:** ajusta exibição do loading interno ([adad019](https://github.com/po-ui/po-style/commit/adad019c0341f6160e237adb437b63fb9a42f2ee))
* **notification:** insere animação fade-in/out para o componente ([48ed4f8](https://github.com/po-ui/po-style/commit/48ed4f8c296a89e9c21af2c631b13eef044d6fee))
* **table:** adiciona compatibilidade com outras fontes de ícones ([ae20661](https://github.com/po-ui/po-style/commit/ae2066177c655a23f704e5fc5ad0264ed2932441))



# [5.8.0](https://github.com/po-ui/po-style/compare/v5.7.0...v5.8.0) (2021-08-09)


### Features

* **table:** aumenta o tamanho do ícone de ações ([42b6b7a](https://github.com/po-ui/po-style/commit/42b6b7a51e984a7e06713b960a8a21bbf6bfb57f))



# [5.7.0](https://github.com/po-ui/po-style/compare/v5.6.0...v5.7.0) (2021-08-02)


### Features

* **navbar:** adiciona estilo para centralizar icones de outras fontes ([a4d8044](https://github.com/po-ui/po-style/commit/a4d8044a13c238684807c39f71c1d8accdcf84fd))



# [5.6.0](https://github.com/po-ui/po-style/compare/v5.5.0...v5.6.0) (2021-07-26)


### Features

* **notification:** adiciona estilo para botão fechar ([d65cd19](https://github.com/po-ui/po-style/commit/d65cd196a8484d5616368135cbea697760176009))



# [5.5.0](https://github.com/po-ui/po-style/compare/v5.4.0...v5.5.0) (2021-07-19)


### Features

* **menu:** inclui seletor para possibilitar outras fontes de ícones ([79fe76a](https://github.com/po-ui/po-style/commit/79fe76af52f5099fa0d09a2adca38c08b8b1d69e))
* **multiselect:** adiciona estilos para a funcionalidade auto ajustavel ([91da4cb](https://github.com/po-ui/po-style/commit/91da4cb3b640e34c835ed89162c610fca177ec7a))



## [5.4.0](https://github.com/po-ui/po-style/compare/v5.3.0...v5.4.0) (2021-07-12)

Compatibilidade com @po-ui/ng-components@5.4.0

# [5.3.0](https://github.com/po-ui/po-style/compare/v5.2.1...v5.3.0) (2021-07-05)


### Features

* **toolbar:** adiciona estilo para centralizar icones de outras fontes ([a3b9c81](https://github.com/po-ui/po-style/commit/a3b9c812d6cffdfe5dc453b59c0d8a5dcfbac9f2))



# [5.2.1](https://github.com/po-ui/po-style/compare/v5.2.0...v5.2.1) (2021-06-28)

Compatibilidade com @po-ui/ng-components@5.2.1

# [5.2.0](https://github.com/po-ui/po-style/compare/v5.1.0...v5.2.0) (2021-06-21)


### Features

* **datepicker-range:** adiciona estilo para calendario range ([1470b44](https://github.com/po-ui/po-style/commit/1470b44d3caed3415e53149ae78b116ffb565dc6))



# [5.1.0](https://github.com/po-ui/po-style/compare/v5.0.0...v5.1.0) (2021-06-14)


### Features

* **popup:** adiciona possibilidade de informar outras fontes de ícones ([ebaa732](https://github.com/po-ui/po-style/commit/ebaa7321a2e514dcc4457899601e416b2bbf0e4d))



# [5.0.0](https://github.com/po-ui/po-style/compare/v5.0.0-rc.1...v5.0.0) (2021-06-07)

Compatibilidade com @po-ui/ng-components@5.0.0

## [5.0.0-rc.1](https://github.com/po-ui/po-style/compare/v4.17.0...v5.0.0-rc.1) (2021-05-31)

Compatibilidade com @po-ui/ng-components@5.0.0-rc.1


# [4.17.0](https://github.com/po-ui/po-style/compare/v4.16.1...v4.17.0) (2021-05-24)


### Features

* **calendar:** adiciona estilos para permitir modo range ([730c9f2](https://github.com/po-ui/po-style/commit/730c9f21d7e3edfe437060f14231b46de90386b7))
* **fields:** inclui seletor para uso de outras fontes de ícones ([3d4883b](https://github.com/po-ui/po-style/commit/3d4883b4e77f34ccfae8f9742204c67b2a98d791))
* **icons:** adiciona novos icones a biblioteca ([669b014](https://github.com/po-ui/po-style/commit/669b01457696d67cce62e1a4e705099eade2eecc))
- doc-xls
- screen-full
- screen-minimize



## [4.16.1](https://github.com/po-ui/po-style/compare/v4.16.0...v4.16.1) (2021-05-17)

Compatibilidade com @po-ui/ng-components@4.16.1

# [4.16.0](https://github.com/po-ui/po-style/compare/v4.15.0...v4.16.0) (2021-05-10)


### Features

* **tag:** atualiza configurações para ícone no componente ([c48e8f5](https://github.com/po-ui/po-style/commit/c48e8f5759acf513e87806b93fa34ed1fc5594ce))



## [4.15.0](https://github.com/po-ui/po-style/compare/v4.14.0...v4.15.0) (2021-04-26)

Compatibilidade com @po-ui/ng-components@4.15.0


# [4.14.0](https://github.com/po-ui/po-style/compare/v4.13.0...v4.14.0) (2021-04-19)


### Features

* **button:** adiciona compatibilidade com outras fontes de ícones ([49de91c](https://github.com/po-ui/po-style/commit/49de91c1993dd8db697c8a27288a3f70ecc89277))



## [4.13.0](https://github.com/po-ui/po-style/compare/v4.12.0...v4.13.0) (2021-04-12)

Compatibilidade com @po-ui/ng-components@4.13.0


# [4.12.0](https://github.com/po-ui/po-style/compare/v4.11.0...v4.12.0) (2021-04-05)


### Features

* **chart:** Define opacidade para gráfico do tipo `area` ([36ac152](https://github.com/po-ui/po-style/commit/36ac15226e33356d1d3c492170cbc1689a345196))



<a name="4.11.0"></a>
## [4.11.0](https://github.com/po-ui/po-style/compare/v4.10.1...v4.11.0) (2021-03-29)

Compatibilidade com @po-ui/ng-components@4.11.0

## [4.10.1](https://github.com/po-ui/po-style/compare/v4.10.0...v4.10.1) (2021-03-22)

Compatibilidade com @po-ui/ng-components@4.10.1


# [4.10.0](https://github.com/po-ui/po-style/compare/v4.9.0...v4.10.0) (2021-03-15)


### Features

* **colors:** Paleta de cores para textos ([43568a5](https://github.com/po-ui/po-style/commit/43568a503084edacf0c494ba46f7385c4d681d0f))



<a name="4.9.0"></a>
# [4.9.0](https://github.com/po-ui/po-style/compare/v4.8.0...v4.9.0) (2021-03-08)


### Features

* **grid-system:** adiciona classes para espaçamento após o campo ([0c8e613](https://github.com/po-ui/po-style/commit/0c8e613))
* **multiselect:** adiciona estilo ao posicionar mouse sobre o campo ([10619a5](https://github.com/po-ui/po-style/commit/10619a5))



# [4.8.0](https://github.com/po-ui/po-style/compare/v4.7.0...v4.8.0) (2021-02-26)


### Features

* **icons:** adiciona novos icones a biblioteca ([3966b45](https://github.com/po-ui/po-style/commit/3966b4560218c59b956faebf367d24ab591495f1))
ícones adicionados:
  - pallet-full
  - pallet-partial


# [4.7.0](https://github.com/po-ui/po-style/compare/v4.6.0...v4.7.0) (2021-02-22)


### Features

* **chart:** novas classes para definição de borda ([3984bfe](https://github.com/po-ui/po-style/commit/3984bfe565797d40a90f611052330ce187d3d823))



<a name="4.6.0"></a>
# [4.6.0](https://github.com/po-ui/po-style/compare/v4.5.0...v4.6.0) (2021-02-15)


### Features

* **chart:** centraliza labels do eixo y ([7ff5f8d](https://github.com/po-ui/po-style/commit/7ff5f8d))
* **chart:** corrige resize do gráfico com elementos externos ([f0c313f](https://github.com/po-ui/po-style/commit/f0c313f))



# [4.5.0](https://github.com/po-ui/po-style/compare/v4.4.0...v4.5.0) (2021-02-08)


### Bug Fixes

* **select:** padroniza a altura do campo ([8cfe799](https://github.com/po-ui/po-style/commit/8cfe799f005d66205cef31dd010ca06427bc70fa))


### Features

* **icons:** adiciona novos ícones a biblioteca ([a6b6c66](https://github.com/po-ui/po-style/commit/a6b6c661d8ba68beeae78f857dd7cf5f5f348ab1))



# [4.4.0](https://github.com/po-ui/po-style/compare/v4.3.0...v4.4.0) (2021-02-01)


### Features

* **style:** estilo para label em gráficos do tipo Donut ([0419f99](https://github.com/po-ui/po-style/commit/0419f99add9230d8732a2e8973cfffad7578d972))



# [4.3.0](https://github.com/po-ui/po-style/compare/v4.2.0...v4.3.0) (2020-12-30)


### Features

* **chart:** define overflow:visible para svg ([48e507c](https://github.com/po-ui/po-style/commit/48e507c90395bfe5e51c3a6840f4f9eba903ba84))



<a name="4.2.0"></a>
# [4.2.0](https://github.com/po-ui/po-style/compare/v4.1.0...v4.2.0) (2020-12-21)


### Features

* **gauge:** estilos para o componente `po-gauge` ([4fb3182](https://github.com/po-ui/po-style/commit/4fb3182))



## [4.1.0](https://github.com/po-ui/po-style/compare/v4.0.0...v4.1.0) (2020-12-14)

Compatibilidade com @po-ui/ng-components@4.1.0

# [4.0.0](https://github.com/po-ui/po-style/compare/v3.14.0...v4.0.0) (2020-12-07)

### Features

* **chart:** estilo para gráficos do tipo Bar ([83a2416](https://github.com/po-ui/po-style/commit/83a24163920bd2829c198d26d059f619e820e5ec))
* **menu-panel:** permite customização da logomarca ([e8c6f97](https://github.com/po-ui/po-style/commit/e8c6f97cd983b5de5f7ded9e9c45ed5fe30eb594))
* **package:** atualiza as dependências ([74e2767](https://github.com/po-ui/po-style/commit/74e2767eb8eae7865861835cea38b252f5d1b43a))


## [3.14.0](https://github.com/po-ui/po-style/compare/v3.13.0...v3.14.0) (2020-11-23)

* **table:** corrige tamanho do loading no Chrome ([1d4d274](https://github.com/po-ui/po-style/commit/1d4d274ca5aaeffafbd98837c7d6d1b677469a0c))
* **chart:** define animação para gráfico de linha ([4702445](https://github.com/po-ui/po-style/commit/4702445bb1f481889712b42ced019bb2ebec5458))

## [3.13.0](https://github.com/po-ui/po-style/compare/v3.12.0...v3.13.0) (2020-11-16)

* **notification:** atualiza espaçamentos para notificações com ações ([eb2008213](https://github.com/po-ui/po-style/commit/eb20082135bad664fe5976ae81373af1b99ed98e))

## [3.12.0](https://github.com/po-ui/po-style/compare/v3.11.0...v3.12.0) (2020-11-09)

* **chart:** adiciona gráfico do tipo Line ([ca13089](https://github.com/po-ui/po-style/pull/167/commits/ca13089a5ff36bf8c717c8cb31cfd097474cdd66))

## [3.11.0](https://github.com/po-ui/po-style/compare/v3.10.0...v3.11.0) (2020-11-03)

Compatibilidade com @po-ui/ng-components@3.11.0

## [3.10.0](https://github.com/po-ui/po-style/compare/v3.9.2...v3.10.0) (2020-10-26)

Compatibilidade com @po-ui/ng-components@3.10.0

## [3.9.2](https://github.com/po-ui/po-style/compare/v3.9.1...v3.9.2) (2020-10-19)

Compatibilidade com @po-ui/ng-components@3.9.2

## [3.9.1](https://github.com/po-ui/po-style/compare/v3.9.0...v3.9.1) (2020-10-13)

Compatibilidade com @po-ui/ng-components@3.9.1

## [3.9.0](https://github.com/po-ui/po-style/compare/v3.8.0...v3.9.0) (2020-10-05)

### Features

* **lookup:** adiciona filtro avançado na janela de busca ([6e2e97e](https://github.com/po-ui/po-style/commit/6e2e97e56039e47ea08b5cec62ec54a481789b97))

## [3.8.0](https://github.com/po-ui/po-style/compare/v3.7.0...v3.8.0) (2020-09-28)

Compatibilidade com @po-ui/ng-components@3.8.0

## [3.7.0](https://github.com/po-ui/po-style/compare/v3.6.0...v3.7.0) (2020-09-21)


### Features

* **popup:** adiciona altura máxima no elemento ([cbfb19](https://github.com/po-ui/po-style/commit/cbfb19aebd4c0913ecaa5ffab40048a3c9a3816f))


## [3.6.0](https://github.com/po-ui/po-style/compare/v3.5.0...v3.6.0) (2020-09-14)


### Features

* **combo:** adiciona estilo para utilizar a propriedade p-clean ([b5cf25f](https://github.com/po-ui/po-style/commit/b5cf25f31d61ce592aac224a58d4eab7fa2e8672)), closes [#152](https://github.com/po-ui/po-style/issues/152)
* **page-slide:** adiciona estilo para o componente po-page-slide ([f9c0baf](https://github.com/po-ui/po-style/commit/f9c0bafda4be7fe0a7fdb74cbdabc12ca2f11bf4))

## [3.5.0](https://github.com/po-ui/po-style/compare/v3.4.0...v3.5.0) (2020-09-08)

Compatibilidade com @po-ui/ng-components@3.5.0

## [3.4.0](https://github.com/po-ui/po-style/compare/v3.3.0...v3.4.0) (2020-08-31)

### Bug Fixes

* **navbar** corrige scrollbar vertical desnecessário ([1b448f]https://github.com/po-ui/po-style/commit/1b448f24c0c133d7003cd9a618ba431186d98b62))

## [3.3.0](https://github.com/po-ui/po-style/compare/v3.2.0...v3.3.0) (2020-08-24)

Compatibilidade com @po-ui/ng-components@3.3.0


## [3.2.0](https://github.com/po-ui/po-style/compare/v3.1.0...v3.2.0) (2020-08-17)

Compatibilidade com @po-ui/ng-components@3.2.0


## [3.1.0](https://github.com/po-ui/po-style/compare/v3.0.0...v3.1.0) (2020-08-10)

### Features

* **build:** substituição do travis pelo github actions ([eb71645](https://github.com/po-ui/po-style/commit/eb71645932574ed05eabbbf58ede80d4f253ab88))

* **build:** retirado dev para voltar para o fluxo de trabalho na master ([4e30c7c0](https://github.com/po-ui/po-style/commit/4e30c7c01528fd9132af889202f35e4de5269e3b))


## [3.0.0](https://github.com/po-ui/po-style/compare/v2.10.0...v3.0.0) (2020-08-03)


### Features

* **icons:** adiciona novos icones a biblioteca ([2d6802f](https://github.com/po-ui/po-style/commit/df342f9a3985e73b991d75b699282348a4f55b08))
ícones adicionados:
  - calendar-settings
  - clipboard
  - steering-wheel
* **page-login:** modifica apresentação do cabeçalho ([2d6802f](https://github.com/po-ui/po-style/commit/2d6802f04a9c440dee2737ff780355d7cc210bf3))
* **table:** adiciona exemplo de tabela com detail customizado ([cf45d8b](https://github.com/po-ui/po-style/commit/cf45d8b37330a3af3822c5db191f119e0b9e1063))
* **page-login:** adiciona botão de suporte ([428a27b](https://github.com/po-ui/po-style/commit/428a27b5cbbc05bdf5287d8f2eaef6f59be8203d))
* **table:** adiciona exemplo show more com loading ([3a8f783](https://github.com/po-ui/po-style/commit/3a8f783f28bb79e2685ab454875bcf0b59353077))
* **table:** implementa nova posição do icone sort ([7830833](https://github.com/po-ui/po-style/commit/783083391c843840520a43296c80cc44fff8ac82))


### Bug Fixes

* **list-view:** corrige alinhamento da caixa de seleção ([099894c](https://github.com/po-ui/po-style/commit/099894c13fc08c40c1d3fbec396acdb8c2cd9fac))


## [2.10.0](https://github.com/po-ui/po-style/compare/v2.9.0...v2.10.0) (2020-07-13)

Compatibilidade com @po-ui/ng-components@2.10.0

## [2.9.0](https://github.com/po-ui/po-style/compare/v2.8.0...v2.9.0) (2020-07-03)

### Features

* **table:** adiciona sample de botão com loading na tabela ([bdba371](https://github.com/po-ui/po-style/commit/bdba3715f52e03a9735c993fb739c192b5c25871))


## [2.8.0](https://github.com/po-ui/po-style/compare/v2.7.0...v2.8.0) (2020-06-26)

### Features

* **table:** Adiciona classe `po-table-header-actions` para omitir o gerenciador de colunas do po-table ([08181e2](https://github.com/po-ui/po-style/commit/08181e234b2562b8dabdcedfe7279b42d5386771))
* **avatar:** adiciona exemplo clicável ([ac00226](https://github.com/po-ui/po-style/commit/ac00226baed3b119e12a79f58a4be22966dce0c9))
* **icons:** adiciona novos ícones na biblioteca ([3630025](https://github.com/po-ui/po-style/commit/36300259b8298e32a0881b2b76b7375778bff4d3))
ícones adicionados:
  - calculator
  - sort-ascending
  - sort-descending


## [2.7.0](https://github.com/po-ui/po-style/compare/v2.6.0...v2.7.0) (2020-06-19)

Compatibilidade com @po-ui/ng-components@2.7.0

## [2.6.0](https://github.com/po-ui/po-style/compare/v2.5.0...v2.6.0) (2020-06-12)

Compatibilidade com @po-ui/ng-components@2.6.0


## [2.5.0](https://github.com/po-ui/po-style/compare/v2.4.1...v2.5.0) (2020-06-05)

### Features

* **page-list:** adiciona tamanho no filtro  ([70dd8f1](https://github.com/po-ui/po-style/commit/70dd8f16afd60f769cddab6368f79a9375fed18b))


## [2.4.1](https://github.com/po-ui/po-style/compare/v2.4.0...v2.4.1) (2020-05-29)


Compatibilidade com @po-ui/ng-components@2.4.1

## [2.4.0](https://github.com/po-ui/po-style/compare/v2.3.0...v2.4.0) (2020-05-22)

### Features

* **icons:** adiciona novos ícones na biblioteca  ([e8cc53f](https://github.com/po-ui/po-style/commit/e8cc53faf746b55c787fee3d01d0928c1818d86e))

ícones adicionados:
  - attach
  - automatic-barrier
  - security-guard
  - social-instagram
  - video-call

ícones atualizados:
  - home
  - settings


## [2.3.0](https://github.com/po-ui/po-style/compare/v2.2.0...v2.3.0) (2020-05-15)


Compatibilidade com @po-ui/ng-components@2.3.0

## [2.2.0](https://github.com/po-ui/po-style/compare/v2.1.1...v2.2.0) (2020-05-08)


Compatibilidade com @po-ui/ng-components@2.2.0

## [2.1.1](https://github.com/po-ui/po-style/compare/v2.1.0...v2.1.1) (2020-04-30)


Compatibilidade com @po-ui/ng-components@2.1.0


## [2.1.0](https://github.com/po-ui/po-style/compare/v2.0.0...v2.1.0) (2020-04-27)

### Features

* **icons:** adiciona novos ícones na biblioteca  ([9957eab](https://github.com/po-ui/po-style/commit/9957eab26629966c413b59049679f96006ec2ece))
  - anchor
  - print
  - handshake

## [2.0.0](https://github.com/po-ui/po-style/compare/v1.28.0...v2.0.0) (2020-04-17)

### Features

* **packages:** atualização do autoprefixer ([471c199](https://github.com/po-ui/po-style/commit/471c1991297097a058ea98444579468a4e745b6e))
* **packages:** atualização do prettier para versão 2.0.2 ([34c279d](https://github.com/po-ui/po-style/commit/34c279d99c034360b07c6f8b1f46df570dfd412c))


### Bug Fixes

* **field-container:** corrige visualização no IE ([465e0ad](https://github.com/po-ui/po-style/commit/465e0ad1859c15d31a0968a19557dff47966925c))
* **page-blocked-user:** corrige ellipsis em contacts ([e273fec](https://github.com/po-ui/po-style/commit/e273fec8f288df69888e3c2ea2da42b612138e0f))
* **table:** define css para radio-button ([e8c1066](https://github.com/po-ui/po-style/commit/e8c106698d5848477ad2f0e5a5140bdb99efb79c))
* **radio-group:** corrige sobreposição de texto ([fd679d8](https://github.com/po-ui/po-style/commit/fd679d8f23c0c64ffcfdd7ee83d4bfd268190547))

## [1.28.0](https://github.com/po-ui/po-style/compare/v1.27.1...v1.28.0) (2020-03-06)

Compatibilidade com @portinari/portinari-ui@1.28.0

## [1.27.1](https://github.com/po-ui/po-style/compare/v1.27.0...v1.27.1) (2020-02-28)

Compatibilidade com @portinari/portinari-ui@1.27.1


## [1.27.0](https://github.com/po-ui/po-style/compare/v1.26.0...v1.27.0) (2020-02-21)


### Features

* **button:** melhora no affordance dos botões com o uso do cursor ([dc5c05e](https://github.com/po-ui/po-style/commit/dc5c05e))



## [1.26.0](https://github.com/po-ui/po-style/compare/v1.25.0...v1.26.0) (2020-02-14)


### Bug Fixes

* **dynamic-view:** corrige impressão da página ([34ba6ba](https://github.com/po-ui/po-style/commit/34ba6ba)), closes [#258](https://github.com/po-ui/po-style/issues/258)
* **navbar:** correção para não aparecer na impressão ([bc8c615](https://github.com/po-ui/po-style/commit/bc8c615))


### Features

* **icons:** adiciona mais 4 ícones a biblioteca ([4258b02](https://github.com/po-ui/po-style/commit/4258b02))
  - pdf
  - sms
  - whatsapp
  - xml


## [1.25.0](https://github.com/po-ui/po-style/compare/v1.24.0...v1.25.0) (2020-02-07)


### Build System

* atualiza os pacotes de dependências ([720712d](https://github.com/po-ui/po-style/commit/720712d))


## [1.24.0](https://github.com/po-ui/po-style/compare/v1.23.0...v1.24.0) (2020-01-24)


Compatibilidade com @portinari/portinari-ui@1.24.0


## [1.23.0](https://github.com/po-ui/po-style/compare/v1.22.2...v1.23.0) (2020-01-17)


Compatibilidade com @portinari/portinari-ui@1.23.0


### [1.22.2](https://github.com/po-ui/po-style/compare/v1.22.1...v1.22.2) (2020-01-10)

Compatibilidade com @portinari/portinari-ui@1.22.2


### [1.22.1](https://github.com/po-ui/po-style/compare/v1.22.0...v1.22.1) (2020-01-06)


Compatibilidade com @portinari/portinari-ui@1.22.1


## [1.22.0](https://github.com/po-ui/po-style/compare/v1.21.0...v1.22.0) (2019-12-27)


Compatibilidade com @portinari/portinari-ui@1.22.0


## [1.21.0](https://github.com/po-ui/po-style/compare/v1.20.0...v1.21.0) (2019-12-23)


Compatibilidade com @portinari/portinari-ui@1.21.0


## [1.20.0](https://github.com/po-ui/po-style/compare/v1.19.0...v1.20.0) (2019-12-13)


### Features

* **combo:** permite agrupamento de itens ([163626d](https://github.com/po-ui/po-style/commit/163626d))



## [1.19.0](https://github.com/po-ui/po-style/compare/v1.18.0...v1.19.0) (2019-12-06)

### Features

* **info:** possibilita transformar o valor em um link ([27d0792](https://github.com/po-ui/po-style/commit/27d0792))



## [1.18.0](https://github.com/po-ui/po-style/compare/v1.17.0...v1.18.0) (2019-11-29)


### Bug Fixes

* **grid:** adiciona arquivos css ([554c2d9](https://github.com/po-ui/po-style/commit/554c2d9))


### Features

* **checkbox:** novo componente ([1c13581](https://github.com/po-ui/po-style/commit/1c13581))
* **tree-view:** adiciona opção de seleção de item ([251df1b](https://github.com/po-ui/po-style/commit/251df1b))



## [1.17.0](https://github.com/po-ui/po-style/compare/v1.16.0...v1.17.0) (2019-11-25)


Compatibilidade com @portinari/portinari-ui@1.17.0


## [1.16.0](https://github.com/po-ui/po-style/compare/v1.15.0...v1.16.0) (2019-11-18)


### Features

* **chart:** adiciona estilos para gráficos gauge ([5c857e4](https://github.com/po-ui/po-style/commit/5c857e4))
* **tooltip:** impede que herde estilo de fonte ([80ce5a7](https://github.com/po-ui/po-style/commit/80ce5a7))
* **tree-view:** novo componente ([4d03d43](https://github.com/po-ui/po-style/commit/4d03d43))



## [1.15.0](https://github.com/po-ui/po-style/compare/v1.14.0...v1.15.0) (2019-11-08)


### Features

* **combo:** permite customizar lista de itens exibidos ([d875114](https://github.com/po-ui/po-style/commit/d875114))



## [1.14.0](https://github.com/po-ui/po-style/compare/v1.13.1...v1.14.0) (2019-11-01)


### Features

* **table:** adiciona gerenciador de colunas ([a782087](https://github.com/po-ui/po-style/commit/a782087))



### [1.13.1](https://github.com/po-ui/po-style/compare/v1.13.0...v1.13.1) (2019-10-25)


Compatibilidade com @portinari/portinari-ui@1.13.1


## [1.13.0](https://github.com/po-ui/po-style/compare/v1.12.0...v1.13.0) (2019-10-18)


### Features

* **icons:** adicionado novos ícones a biblioteca ([aafa0e2](https://github.com/po-ui/po-style/commit/aafa0e2))



## [1.12.0](https://github.com/po-ui/po-style/compare/v1.11.0...v1.12.0) (2019-10-11)


### Bug Fixes

* **modal:** corrige scroll ao usar po-url no IE/Edge ([9d2a1e5](https://github.com/po-ui/po-style/commit/9d2a1e5))


### Features

* **po-theme:** adiciona propriedade name ao comando build ([5e7df6d](https://github.com/po-ui/po-style/commit/5e7df6d))
* **rich-text:** permite a inclusão de links ([f29424c](https://github.com/po-ui/po-style/commit/f29424c))
* **tag:** permitir inversão das cores ([d84484e](https://github.com/po-ui/po-style/commit/d84484e))



## [1.11.0](https://github.com/po-ui/po-style/compare/v1.10.0...v1.11.0) (2019-10-04)


### Features

* **accordion:** cria o componente ([48184e4](https://github.com/po-ui/po-style/commit/48184e4))
* **po-theme:** cria ferramenta de criação de temas customizados ([8cfeba2](https://github.com/po-ui/po-style/commit/8cfeba2))
* **rich-text:** incluída opção de inserir imagem ([b14dc1b](https://github.com/po-ui/po-style/commit/b14dc1b))
* **tag:** permitir o uso da paleta de cores e ícones ([902ec35](https://github.com/po-ui/po-style/commit/902ec35))



## [1.10.0](https://github.com/po-ui/po-style/compare/v1.9.0...v1.10.0) (2019-09-27)


### Bug Fixes

* **toolbar:** corrige o funcionamento sem o p-profile ([f413d68](https://github.com/po-ui/po-style/commit/f413d68))


### Features

* **upload:** adiciona opção para envio de pastas ([f3d5562](https://github.com/po-ui/po-style/commit/f3d5562))



## [1.9.0](https://github.com/po-ui/po-style/compare/v1.8.1...v1.9.0) (2019-09-20)


### Features

* **build:** adiciona novos arquivos ao pacote publicado ([55a22bc](https://github.com/po-ui/po-style/commit/55a22bc))
* **icons:** adiciona novos ícones a biblioteca ([8068c28](https://github.com/po-ui/po-style/commit/8068c28))



### [1.8.1](https://github.com/po-ui/po-style/compare/v1.8.0...v1.8.1) (2019-09-13)


### Bug Fixes

* **checkbox-group:** ajusta espaçamento ([aaae2d1](https://github.com/po-ui/po-style/commit/aaae2d1))
* **table:** corrige scroll do eixo y no IE ([d09e58d](https://github.com/po-ui/po-style/commit/d09e58d))



## [1.8.0](https://github.com/po-ui/po-style/compare/v1.7.0...v1.8.0) (2019-09-06)


### Features

* **progress:** adiciona o evento de tentar novamente ([d6cd6d1](https://github.com/po-ui/po-style/commit/d6cd6d1))
* **rich-text:** possibilita que usuário mude a cor do texto ([42e9569](https://github.com/po-ui/po-style/commit/42e9569))
* **upload:** modifica o link do drag drop ([090d3e5](https://github.com/po-ui/po-style/commit/090d3e5))
* **upload:** passa a utilizar o po-progress como barra de progresso ([79871e6](https://github.com/po-ui/po-style/commit/79871e6))



## [1.7.0](https://github.com/po-ui/po-style/compare/v1.6.0...v1.7.0) (2019-08-30)

Compatibilidade com @portinari/portinari-ui@1.7.0


## [1.6.0](https://github.com/po-ui/po-style/compare/v1.5.0...v1.6.0) (2019-08-23)


### Features

* **upload:** exibir restrições de arquivos ([cd5182e](https://github.com/po-ui/po-style/commit/cd5182e))



## [1.5.0](https://github.com/po-ui/po-style/compare/v1.4.0...v1.5.0) (2019-08-16)


### Bug Fixes

* **menu:** corrige comportamento do grid system no template ([23607f9](https://github.com/po-ui/po-style/commit/23607f9))


### Features

* **tabs:** possibilita scrollagem horizontal das tabs em telas pequenas ([2550ea8](https://github.com/po-ui/po-style/commit/2550ea8))



## [1.4.0](https://github.com/po-ui/po-style/compare/v1.3.1...v1.4.0) (2019-08-09)


### Features

* **progress:** cria o componente po-progress ([0e4fded](https://github.com/po-ui/po-style/commit/0e4fded))



### [1.3.1](https://github.com/po-ui/po-style/compare/v1.3.0...v1.3.1) (2019-08-02)


Compatibilidade com @portinari/portinari-ui@1.3.1



## [1.3.0](https://github.com/po-ui/po-style/compare/v1.1.1...v1.3.0) (2019-07-26)


### Build System

* **gulp:** Altera a pasta gerada na distribuição de po-theme para style ([7596f04](https://github.com/po-ui/po-style/commit/7596f04))


### Features

* **loading:** trata o ícone de carregamento para conexões 3g ([9bf5256](https://github.com/po-ui/po-style/commit/9bf5256))
* **upload:** permite que o componente aceite drag and drop ([07cdb9a](https://github.com/po-ui/po-style/commit/07cdb9a))



### [1.1.1](https://github.com/po-ui/po-style/compare/v1.1.0...v1.1.1) (2019-07-12)


### Bug Fixes

* **navbar:** corrige detalhes na responsividade e logo ([2c795fa](https://github.com/po-ui/po-style/commit/2c795fa))


## [1.1.0](https://github.com/po-ui/po-style/compare/v1.0.0...v1.1.0) (2019-07-05)


### Bug Fixes

* **select, checkbox:** problemas de responsividade em alguns browsers ([5ae78df](https://github.com/po-ui/po-style/commit/5ae78df))


### Features

* **modal:** remove a largura máxima da modal quando utilizar o tipo "auto" ([50334a7](https://github.com/po-ui/po-style/commit/50334a7))



## 1.0.0 (2019-06-25)
