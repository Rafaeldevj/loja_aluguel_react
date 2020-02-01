# Descrição

### O desafio foi dividio em duas partes:

### Backend, feito com java utilizando o framework Spring.

### Frontend, feito com a biblioteca ReactJS

#### Para executar os projetos, seguiremos a seguinte ordem:

### Backend:

* Baixar o projeto da pasta `api`;
* Configurar o arquivo `application.properties` que está localizado no `api/src/main/resources`;
* No arquivo `application.properties`, você colocará os dados de acesso do seu banco de dados 
postgres;
* Depois de criar o banco de dados, execute o script na raiz do repositório cujo nome é: `scripts.sql`
essas informções são fundamentais para o funcionamento do sistema;
* Logo após a execução do script, basta rodar a aplicação Java

### Frontend:
* Baixar o projeto da pasta `frontend`;
* O projeto necessita tando do `node.js` quanto do `yarn` para ser executado,
caso não tenha em sua máquina, acesse os links abaixo:
    * node.js: [Baixar node.js](https://nodejs.org/pt-br/download/)
    * yarn: [Baixar yarn](https://legacy.yarnpkg.com/en/docs/install/#mac-stable)
* Logo após a etapa de instalação, basta entrar na pasta do projeto `frontend` e rodar o comando
`yarn install`, para o projeto baixar todos os plugins e bibliotecas necessárias.
* Por fim, dando tudo certo até o seguinte momento, basta rodar o comando `yarn start`
