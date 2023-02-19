const app = require('./app.js')

// escolhendo a porta em que o servidor será aberto
const port = 6808

// abrindo o servidor na porta escolhida
app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}/`)
})