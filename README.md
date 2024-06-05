# Mini App Prova-DesenvolvimentoWebII-main

Este projeto é um frontend desenvolvido em HTML, CSS e JavaScript que lista os deputados brasileiros utilizando a API de Dados Abertos da Câmara dos Deputados.

git clone https://github.com/Delvecchi/Prova2-DesenvolvimentoWebII.git



## Funcionalidades

- **Listagem de Deputados**: O arquivo `index.html` contém a estrutura HTML para exibir a lista de deputados, utilizando classes CSS para estilização.
  
- **Detalhes do Deputado**: O JavaScript em `script.js` faz requisições à API da Câmara dos Deputados para obter informações detalhadas de cada deputado, como nome, partido, estado, foto, etc. Essas informações são exibidas dinamicamente na página.

- **Busca por ID**: O script também permite buscar deputados por ID, enviando requisições específicas à API para obter informações detalhadas de um deputado específico.



## Configuração do Projeto

Clone o repositório e certifique-se de ter o Composer instalado. Em seguida, execute o seguinte comando na raiz do projeto:

## Configuração do Autoload

O projeto utiliza o Composer para carregar automaticamente as classes. Certifique-se de que o autoload está configurado corretamente no arquivo composer.json:

```json
"autoload": {
    "psr-4": {
        "App\\": "Backend/"
    }
}

# Execução dos Testes

Para executar os testes unitários do projeto, utilize o PHPUnit. Certifique-se de ter as dependências de desenvolvimento instaladas:

composer install --dev

Execute os testes:

vendor/bin/phpunit

 ## Autor

- Nome: Faustinopsy
- Email: rodrigohipnose@gmail.com# Mini App Prova-DesenvolvimentoWebII-main

Este projeto é um frontend desenvolvido em HTML, CSS e JavaScript que lista os deputados brasileiros utilizando a API de Dados Abertos da Câmara dos Deputados.

git clone https://github.com/Delvecchi/Prova2-DesenvolvimentoWebII.git



## Funcionalidades

- **Listagem de Deputados**: O arquivo `index.html` contém a estrutura HTML para exibir a lista de deputados, utilizando classes CSS para estilização.
  
- **Detalhes do Deputado**: O JavaScript em `script.js` faz requisições à API da Câmara dos Deputados para obter informações detalhadas de cada deputado, como nome, partido, estado, foto, etc. Essas informações são exibidas dinamicamente na página.

- **Busca por ID**: O script também permite buscar deputados por ID, enviando requisições específicas à API para obter informações detalhadas de um deputado específico.



## Configuração do Projeto

Clone o repositório e certifique-se de ter o Composer instalado. Em seguida, execute o seguinte comando na raiz do projeto:

## Configuração do Autoload

O projeto utiliza o Composer para carregar automaticamente as classes. Certifique-se de que o autoload está configurado corretamente no arquivo composer.json:

```json
"autoload": {
    "psr-4": {
        "App\\": "Backend/"
    }
}

# Execução dos Testes

Para executar os testes unitários do projeto, utilize o PHPUnit. Certifique-se de ter as dependências de desenvolvimento instaladas:

composer install --dev

Execute os testes:

vendor/bin/phpunit

 ## Autor

- Nome: Faustinopsy
- Email: rodrigohipnose@gmail.com
