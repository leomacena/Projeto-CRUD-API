// Esse arquivo foi criado para ser executado apenas uma vez, resultando na criação e população do banco de dados.

// Importação da biblioteca sqlite3, inicializando uma nova instância do objeto Database e retornando uma API para interagir com bancos de dados SQLite.
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Stores (Lojas)

// Declaração SQL usada para criar a estrutura da tabela no banco de dados, permitindo que possamos inserir e consultar dados posteriormente.
const STORES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "STORES" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "unidade" varchar(80),
    "endereco" varchar(100),
    "telefone" varchar(20),
    "email" varchar(90),
    "horario_abertura" time,
    "horario_fechamento" time
);
`;

// inserção dos registros na tabela Stores (Lojas).
const ADD_STORES_DATA = `
INSERT INTO STORES (id, unidade, endereco, telefone, email, horario_abertura, horario_fechamento)
VALUES
(1, 'Bookstore RJ', 'Rua A, 123, Leblon, Rio de Janeiro/RJ ', '(21) 1111-1111', 'store.rj@bookstore.com', '09:00:00', '21:00:00'),
(2, 'Bookstore SP', 'Rua B, 456, Vila Olímpia, São Paulo/SP', '(11) 2222-2222', 'store.sp@bookstore.com', '10:00:00', '22:00:00'),
(3, 'Bookstore RS', 'Rua C, 789, Bela Vista, Porto Alegre/RS', '(51) 3333-3333', 'store.rs@bookstore.com', '08:30:00', '20:30:00')
`

// Função responsável por criar a tabela "STORES" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console.
function criaTabelaStores() {
    db.run(STORES_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela STORES");
    });
}

// Função responsável pela inserção dos registros na tabela "STORES" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console. 
function populaTabelaStores() {
    db.run(ADD_STORES_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela STORES")
    });
}

// Books (Livros)

// Declaração SQL usada para criar a estrutura da tabela no banco de dados, permitindo que possamos inserir e consultar dados posteriormente.
const BOOKS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "BOOKS" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" varchar(70),
    "autor" varchar(90),
    "editora" varchar(70),
    "idioma" varchar(40),
    "paginas" integer,
    "ano" integer,
    "valor" decimal (10, 2)
);
`;

// inserção dos registros na tabela Books (livros).
const ADD_BOOKS_DATA = `
INSERT INTO BOOKS (id, nome, autor, editora, idioma, paginas, ano, valor)
VALUES
(1, 'Pai Rico, Pai Pobre', 'Robert T. Kiyosaki', 'Alta Books', 'Português', '336', '2018', 34.99),
(2, 'Pedagogia do Oprimido', 'Paulo Freire', 'Paz & Terra', 'Português', '256', '2019', 29.99),
(3, 'Investimentos inteligentes', 'Gustavo Cerbasi', 'Editora Sextante', 'Português', '256', '1999', 33.90),
(4, '20 regras de ouro para educar filhos e alunos', 'Augusto Cury', 'Academia', 'Português', '208', '2017', 35.91),
(5, 'Pais brilhantes, professores fascinantes', 'Augusto Cury', 'Editora Sextante', 'Português', '176', '2018', 36.90),
(6, 'É assim que acaba', 'Colleen Hoover', 'Galera', 'Português', '368', '2018', 34.99),
(7, 'A revolução dos bichos', 'George Orwell', 'Companhia das Letras', 'Português', '152', '2007', 24.90),
(8, 'O Diário Perdido de Gravity Falls', 'Alex Hirsch', 'Universo dos Livros', 'Português', '288', '2020', 54.99),
(9, 'Os sete maridos de Evelyn Hugo', 'Taylor Jenkins Reid', 'Paralela', 'Português', '360', '2019', 35.90),
(10, 'A garota do lago', 'Charlie Donlea', 'Faro Editorial', 'Português', '296', '2017', 9.49),
(11, 'Federer', 'Christopher Clarey', 'Intrínseca', 'Português', '432', '2021', 62.90),
(12, 'Guardiola confidencial', 'Perarnau Martí', 'Editora Grande Área', 'Português', '416', '2015', 60.65),
(13, 'A História do Futebol para quem tem pressa', 'Márcio Trevisan', 'Valentina', 'Português', '200', '2019', 22.99),
(14, 'Escola brasileira de futebol', 'Paulo Vinícius Coelho (PVC)', 'Objetiva', 'Português', '294', '2018', 39.99),
(15, 'O algoritmo da vitória', 'José Salibi Neto', 'Planeta Estratégia', 'Português', '320', '2020', 53.92)
`

// Função responsável por criar a tabela "BOOKS" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console.
function criaTabelaBooks() {
    db.run(BOOKS_SCHEMA, (error) => {
        if(error) console.log("Erro ao criar tabela de Books");
    });
}

// Função responsável pela inserção dos registros na tabela "BOOKS" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console. 
function populaTabelaBooks() {
    db.run(ADD_BOOKS_DATA, (error) => {
        if(error) console.log("Erro ao popular tabela de Books");
    });
}

// Stock (Estoque)

// Declaração SQL usada para criar a estrutura da tabela no banco de dados, permitindo que possamos inserir e consultar dados posteriormente.
const STOCK_SCHEMA = `
CREATE TABLE IF NOT EXISTS "STOCK" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "id_books" integer,    
    "id_stores" integer,    
    "quantidade" integer,
    FOREIGN KEY(id_books) REFERENCES BOOKS(id),
    FOREIGN KEY(id_stores) REFERENCES STORES(id)    
);
`;

// inserção dos registros na tabela Stock (Estoque).
const ADD_STOCK_DATA = `
INSERT INTO STOCK (id_books, id_stores, quantidade)
VALUES
(1, 1, 5),
(1, 2, 5),
(1, 3, 5),
(2, 1, 5),
(2, 2, 5),
(2, 3, 5),
(3, 1, 5),
(3, 2, 5),
(3, 3, 5),
(4, 1, 5),
(4, 2, 5),
(4, 3, 5),
(5, 1, 5),
(5, 2, 5),
(5, 3, 5),
(6, 1, 5),
(6, 2, 5),
(6, 3, 5),
(7, 1, 5),
(7, 2, 5),
(7, 3, 5),
(8, 1, 5),
(8, 2, 5),
(8, 3, 5),
(9, 1, 5),
(9, 2, 5),
(9, 3, 5),
(10, 1, 5),
(10, 2, 5),
(10, 3, 5),
(11, 1, 5),
(11, 2, 5),
(11, 3, 5),
(12, 1, 5),
(12, 2, 5),
(12, 3, 5),
(13, 1, 5),
(13, 2, 5),
(13, 3, 5),
(14, 1, 5),
(14, 2, 5),
(14, 3, 5),
(15, 1, 5),
(15, 2, 5),
(15, 3, 5)
`

// Função responsável por criar a tabela "STOCK" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console.
function criaTabelaStock() {
    db.run(STOCK_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela STOCK");
    });
}

// Função responsável pela inserção dos registros na tabela "STOCK" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console. 
function populaTabelaStock() {
    db.run(ADD_STOCK_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela STOCK")
    });
}

// Employees (Funcionários)

// Declaração SQL usada para criar a estrutura da tabela no banco de dados, permitindo que possamos inserir e consultar dados posteriormente.
const EMPLOYEES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "EMPLOYEES" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" varchar(90),
    "matricula" varchar (10),
    "cargo" varchar (40),
    "email" varchar(90),
    "telefone" varchar(20),
    "data_de_nascimento" date,
    "cpf" varchar(14), 
    "senha" varchar(8),
    "id_stores" integer,
    FOREIGN KEY(id_stores) REFERENCES STORES(id)    
);
`;

// inserção dos registros na tabela Employees (Funcionários).
const ADD_EMPLOYEES_DATA = `
INSERT INTO EMPLOYEES (id, nome, matricula, cargo, email, telefone, data_de_nascimento, cpf, senha, id_stores)
VALUES
(1, 'Hannah Davis', '92458617', 'Gerente', 'hannah.davis@bookstore.com', '(51) 99123-4567', '04-09-1992', '722.831.930-92', '********', 3),
(2, 'Liam Patel', '73102859', 'Consultor(a)', 'liam.patel@bookstore.com', '(51) 98912-3456', '23-07-1998', '514.868.746-62', '********', 3),
(3, 'Sofia Nguyen', '21983645', 'Caixa', 'sofia.nguyen@bookstore.com', '(51) 97891-2345', '10-12-1995', '771.385.631-48', '********', 3),
(4, 'Oliver Hernandez', '40850971', 'Gerente', 'oliver.hernandez@bookstore.com', '(11) 96789-1234', '28-03-1987', '826.764.891-72', '********', 2),
(5, 'Ava Campbell', '69274385', 'Consultor(a)', 'ava.campbell@bookstore.com', '(11) 95678-9123', '15-01-2000', '920.215.365-41', '********', 2),
(6, 'Elijah Kim', '56719034', 'Caixa', 'elijah.kim@bookstore.com', '(11) 94567-8912', '02-06-1991', '183.079.271-48', '********', 2),
(7, 'Mia Chen', '15409726', 'Gerente', 'mia.chen@bookstore.com', '(21) 93456-7891', '21-08-1997', '616.015.820-83', '********', 1),
(8, 'Ethan Singh', '86231904', 'Consultor(a)', 'ethan.singh@bookstore.com', '(21) 92345-6789', '11-05-1994', '620.817.697-83', '********', 1),
(9, 'Isabella Lee', '39416275', 'Caixa', 'isabella.lee@bookstore.com', '(21) 91234-5678', '17-11-1989', '278.601.998-70', '********', 1)
`

// Função responsável por criar a tabela "EMPLOYEES" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console.
function criaTabelaEmployees() {
    db.run(EMPLOYEES_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela EMPLOYEES");
    });
}

// Função responsável pela inserção dos registros na tabela "EMPLOYEES" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console. 
function populaTabelaEmployees() {
    db.run(ADD_EMPLOYEES_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela EMPLOYEES")
    });
}

// Customers (Clientes)

// Declaração SQL usada para criar a estrutura da tabela no banco de dados, permitindo que possamos inserir e consultar dados posteriormente.
const CUSTOMERS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "CUSTOMERS" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" varchar(90),
    "email" varchar(90),
    "telefone" varchar(20),
    "data_de_nascimento" date,
    "cpf" varchar(14), 
    "senha" varchar(8)
);
`;

// inserção dos registros na tabela Customers (clientes).
const ADD_CUSTOMERS_DATA = `
INSERT INTO CUSTOMERS (id, nome, email, telefone, data_de_nascimento, cpf, senha)
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
    });
}

// Sales (Vendas)

// Declaração SQL usada para criar a estrutura da tabela no banco de dados, permitindo que possamos inserir e consultar dados posteriormente.
const SALES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "SALES" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "id_customers" integer,    
    "id_books" integer,    
    "quantidade_adquirida" integer,
    "id_stores" integer,    
    "data_compra" date,
    "horario_compra" time,
    FOREIGN KEY(id_customers) REFERENCES CUSTOMERS(id),
    FOREIGN KEY(id_books) REFERENCES BOOKS(id),
    FOREIGN KEY(id_stores) REFERENCES STORES(id)    
);
`;

// inserção dos registros na tabela Customers (clientes).
const ADD_SALES_DATA = `
INSERT INTO SALES (id_customers, id_books, quantidade_adquirida, id_stores, data_compra, horario_compra)
VALUES
(2, 7, 1, 1, '02-01-2023', '14:07:11'),
(15, 3, 1, 1, '03-02-2023', '15:30:02'),
(1, 12, 1, 2, '04-01-2023', '13:12:30'),
(14, 5, 1, 2, '05-02-2023', '19:50:12'),
(5, 9, 1, 3, '06-01-2023', '18:09:31'),
(7, 10, 1, 3, '07-02-2023', '10:11:10')
`

// Função responsável por criar a tabela "SALES" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console.
function criaTabelaSales() {
    db.run(SALES_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela SALES");
    });
}

// Função responsável pela inserção dos registros na tabela "SALES" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console. 
function populaTabelaSales() {
    db.run(ADD_SALES_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela SALES")
    });
}

// Funções executadas de forma síncrona, uma após a outra, dentro da função serialize(). Ao final da execução dessas funções, o banco de dados estará criado e populado com as informações fornecidas. 
db.serialize( () => {
    criaTabelaStores();
    populaTabelaStores();
    criaTabelaBooks();
    populaTabelaBooks();
    criaTabelaStock();
    populaTabelaStock();
    criaTabelaEmployees();
    populaTabelaEmployees();
    criaTabelaCustomers();
    populaTabelaCustomers();
    criaTabelaSales();
    populaTabelaSales();
});
