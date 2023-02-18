// Esse arquivo foi criado para ser executado apenas uma vez, resultando na criação e população do banco de dados.

// Importação da biblioteca sqlite3, inicializando uma nova instância do objeto Database e retornando uma API para interagir com bancos de dados SQLite.
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Clientes

// Declaração SQL usada para criar a estrutura da tabela no banco de dados, permitindo que possamos inserir e consultar dados posteriormente.
const CUSTOMERS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "CUSTOMERS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "NOME" varchar(90),
    "EMAIL" varchar(90),
    "TELEFONE" varchar(20),
    "DATA_DE_NASCIMENTO" date,
    "CPF" varchar(14), 
    "SENHA" varchar(8)
);
`;

// inserção dos registros na tabela Customers (clientes).
const ADD_CUSTOMERS_DATA = `
INSERT INTO CUSTOMERS (ID, NOME, EMAIL, TELEFONE, DATA_DE_NASCIMENTO, CPF, SENHA)
VALUES
(1, 'Ana Paula', 'ana.paula@example.com', '(11) 98765-4321', '15-03-1990', '111.222.333-44', '********'),
(2, 'Bruno Silva', 'b.silva@example.com', '(21) 99999-8881', '27-07-1985', '222.333.444-55', '********'),
(3, 'Carla Mendes', 'carlamendes@example.com', '(85) 99999-7777', '01-01-1995', '333.444.555-66', '********'),
(4, 'Daniel Rodrigues', 'daniel.rodrigues@example.com', '(61) 98765-4320', '11-05-1983', '444.555.666-77', '********'),
(5, 'Erika Oliveira', 'erika.oliveira@example.com', '(48) 99999-8882', '30-09-1976', '555.666.777-88', '********'),
(6, 'Fabio Souza', 'fabio.souza@example.com', '(12) 98765-4322', '10-11-1992', '666.777.888-99', '********'),
(7, 'Gabriela Lima', 'gabriela.lima@example.com', '(41) 99999-8883', '12-06-1988', '777.888.999-00', '********'),
(8, 'Henrique Santos', 'henrique.santos@example.com', '(62) 99999-7777', '22-02-1994', '888.999.000-11', '********'),
(9, 'Isabela Vieira', 'isabelavieira@example.com', '(31) 98765-4325', '18-04-1991', '999.000.111-22', '********'),
(10, 'Juliana Castro', 'julianacastro@example.com', '(71) 99999-8884', '01-08-1982', '000.111.222-33', '********'),
(11, 'Lucas Silva', 'lucas.silva@example.com', '(31) 99999-7776', '25-12-1997', '111.222.333-45', '********'),
(12, 'Maria Costa', 'maria.costa@example.com', '(19) 98765-4326', '22-03-1986', '222.333.444-56', '********'),
(13, 'Nathalia Santos', 'nathalia.santos@example.com', '(75) 99999-8885', '03-05-1993', '333.444.555-67', '********'),
(14, 'Felipe Barbosa', 'felipebarbosa@example.com', '(11) 98765-4333', '22-08-1985', '444.555.666-78', '********'),
(15, 'Eduardo Silva', 'eduardosilva@example.com', '(21) 95556-6669', '07-03-1995', '555.666.777-89', '********')
`
// Função responsável por criar a tabela "CUSTOMERS" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console.
function criaTabelaCustomers() {
    db.run(CUSTOMERS_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela CUSTOMERS");
    });
}

// Função responsável pela inserção dos registros na tabela "CUSTOMERS" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console. 
function populaTabelaCustomers() {
    db.run(ADD_CUSTOMERS_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela CUSTOMERS")
    })
}
