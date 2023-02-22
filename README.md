<h1>PROJETO EM GRUPO</h1>

<b>
  
<h3>Módulo 5 – CRUD API</h3><br>

## PROPOSTA DO PROJETO
<p><h4>Nesse projeto você e sua squad serão responsáveis por definir quais são as entidades que o projeto precisa contemplar e cada um de vocês será responsável por implementar uma dessas entidades.</h4></p>

## ENTREGA

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

## ESTRUTURAÇÃO DO PROJETO E DEPENDÊNCIAS

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

## DIAGRAMA:
<p> Tabelas do projeto, com suas respectivas entidades, atributos e relacionamentos</p>
<img src="https://raw.githubusercontent.com/leomacena/Projeto-CRUD-API/main/Diagram_Bookstore.png" />

<br>
<br>

## ARQUIVOS: `app.js` e `server.js`

Em `./src/app.js`, importamos o EXPRESS e CORS, e definimos a contante app para utilizar o EXPRESS.
```js
const express = require('express')
const cors = require('cors')
const app = express()
```

Configuramos o servidor para receber requisições com o corpo no formato JSON, e para aceitar requisições vindas de origens diferentes.
```js
app.use(express.json())
app.use(cors())
```

Importamos os controllers
```js
const bookController = require('./controllers/book-controller.js')
const customerController = require('./controllers/customer-controller.js')
const employeesController = require('./controllers/employees-controller.js')
const salesController = require('./controllers/sales-controller.js')
const stockController = require('./controllers/stock-controller.js')
const storeController = require('./controllers/Store-controller')
```

Chamamos as rotas
```js
bookController.rotas(app)
customerController.rotas(app)
employeesController.rotas(app)
salesController.rotas(app)
stockController.rotas(app)
storeController.rotas(app)
```
Exportamos o app para ser usado em outro módulo.
```js
module.exports = app                  
```

Em `./src/server.js`, importamos o app.js, definimos uma porta de rede e definimos uma escuta para observar a porta:

```js
const app = require('./app.js')
const port = 6808
app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}/`)
})
```
<br>

## ARQUIVOS: `create-and-populate.js` e `db.js`

O `./src/infra/create-and-populate.js` foi criado para ser executado apenas uma vez, resultando na criação e população do banco de dados.

Importação da biblioteca sqlite3, inicializando uma nova instância do objeto Database e retornando uma API para interagir com bancos de dados SQLite.
```js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
```
Declaração SQL usada para criar a estrutura da tabela no banco de dados, permitindo que possamos inserir e consultar dados posteriormente.
```js
const ENTIDADE_SCHEMA = `
CREATE TABLE IF NOT EXISTS "ENTIDADE" (
    "atributo1" INTEGER PRIMARY KEY AUTOINCREMENT,
    "atributo2" varchar(80),
    "atributo3" varchar(100),
);
`
```

Inserção dos registros na tabela.
```js
const ADD_ENTIDADE_DATA = `
INSERT INTO ENTIDADE (atributo1, atributo2, atributo3)
VALUES
(dados1, 'dados2', 'dados3'),
(dados1, 'dados2', 'dados3'),
(dados1, 'dados2', 'dados3')
`
```

Função responsável por criar a tabela "ENTIDADE" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console.
```js
function criaTabelaEntidade() {
    db.run(ENTIDADE_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela ENTIDADE");
    });
}
```

Função responsável pela inserção dos registros na tabela "ENTIDADE" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console.
```js
function populaTabelaEntidade() {
    db.run(ADD_ENTIDADE_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela ENTIDADE")
    });
}
```

Funções executadas de forma síncrona, uma após a outra, dentro da função serialize(). Ao final da execução dessas funções, o banco de dados estará criado e populado com as informações fornecidas. 
```js
db.serialize( () => {
    criaTabelaEntidade();
    populaTabelaEntidade();
});
```

Já em `./src/infra/db.js`, importamos o pacote sqlite3 e a função verbose(), que habilita mensages de depuração (mensagens utilizadas para identificação de problemas).
```js
const sqlite3 = require('sqlite3').verbose();
```

Criação do objeto Database, que será usado para executar operações no banco de dados.
```js
const db = new sqlite3.Database('./src/infra/database.db');
```

Registro de uma escuta para o evento 'SIGINT' (Ctrl+C). A função anônima passada como segundo argumento é executada quando esse evento é detectado. Ela encerra a conexão com o banco de dados chamando o método close() do objeto db e finaliza o processo com process.exit(0).
```js
process.on('SIGINT', () =>
    db.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);
```

Exportação do objeto "db" para que ele possa ser utilizado em outros módulos da aplicação.
```js
module.exports = db;
```







</b>
