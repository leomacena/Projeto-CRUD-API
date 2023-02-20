<h1>PROJETO EM GRUPO</h1>

<b>
  
<h3>Módulo 5 – CRUD API</h3><br>

<h2>PROPOSTA DO PROJETO</h2>
<p><h4>Nesse projeto você e sua squad serão responsáveis por definir quais são as entidades que o projeto precisa contemplar e cada um de vocês será responsável por implementar uma dessas entidades.</h4></p>

<h2>ENTREGA</h2>

<p><h4>Deve ser feita em um único repositório (ou seja, o grupo vai trabalhar no mesmo repositório criando todas as rotas para as entidades mapeadas).</h4></p>

O projeto deverá obrigatoriamente:
<ol>
<li> Utilizar o padrão MVC;</li>
<li> Utilizar os verbos HTTP seguindo o padrão REST;</li>
<li> Implementar todas as operações de CRUD;</li>
<li> Utilizar o padrão de projeto (design pattern) DAO para abstração de transações no banco, com Promises;</li>
<li> Utilizar o README.md do repositório para documentação, contendo informações como:</li>
<ul>
<li> Como instalar as dependências do projeto;</li>
<li> Como executar o projeto;</li>
<li> Quais são as rotas possíveis;</li>
<li> Quaisquer outros pontos que você achar necessários;</li>
</ul>
<li> Utilização de async/await para operações no banco (DAO)</li>
<li> Ter o código fonte hospedado em um repositório no Github.</li>
</ol>

<h2>ESTRUTURAÇÃO DO PROJETO E DEPENDÊNCIAS</h2>

Inicia o projeto na pasta desejada com:
```sh
npm init -y
```
<br>

Instalação das dependências:
```sh
npm install express
npm install -g nodemon
npm install --save-dev nodemon
npm install cors
npm install sqlite3
```
<br>

No arquivo `package.json` foi criado o script `"start": "node ./src/server.js"`, e para executar o projeto é utilizado:
```sh
npm start
```
<br>

E para utilizar a ferramenta como desenvolvedor, foi criado o script `"dev": "nodemon ./src/server.js"`, que é executado com o comando:
```sh
npm run dev
```
<br>

<h2>DIAGRAMA:</h2>
<p> Tabelas do projeto, com suas respectivas entidades, atributos e relacionamentos</p>
<img src="https://raw.githubusercontent.com/leomacena/Projeto-CRUD-API/main/Diagram_Bookstore.png" />




</b>
