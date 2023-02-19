// Importe do pacote sqlite3 e a função verbose(), que habilita mensages de depuração (mensagens utilizadas para identificação de problemas)
const sqlite3 = require('sqlite3').verbose();

// Criação do objeto Database, que será usado para executar operações no banco de dados.
const db = new sqlite3.Database('./src/infra/database.db');

// Registro de uma escuta para o evento 'SIGINT' (Ctrl+C). A função anônima passada como segundo argumento é executada quando esse evento é detectado. Ela encerra a conexão com o banco de dados chamando o método close() do objeto db e finaliza o processo com process.exit(0).
process.on('SIGINT', () =>
    db.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

// Exportação do objeto "db" para que ele possa ser utilizado em outros módulos da aplicação.
module.exports = db;