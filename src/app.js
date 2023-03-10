// Importando o packages
const express = require('express')

// Importando o cors
const cors = require('cors')

// instanciando o servidor
const app = express()

// configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json())

// Usado para aceitar requisições vindas de origens diferentes.
app.use(cors())


// importando os controllers
const bookController = require('./controllers/book-controller.js')
const customerController = require('./controllers/customer-controller.js')
const employeesController = require('./controllers/employees-controller.js')
const salesController = require('./controllers/sales-controller.js')
const stockController = require('./controllers/stock-controller.js')
const storeController = require('./controllers/store-controller.js')

// Chama as rotas
bookController.rotas(app)
customerController.rotas(app)
employeesController.rotas(app)
salesController.rotas(app)
stockController.rotas(app)
storeController.rotas(app)

// Exporta o app para ser usado em outro módulo
module.exports = app                  
