CREATE TABLE `STORES` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `unidade` varchar(80),
  `endereco` varchar(100),
  `telefone` varchar(20),
  `email` varchar(90),
  `horario_abertura` time,
  `horario_fechamento` time
);

CREATE TABLE `BOOKS` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(70),
  `autor` VARCHAR(90),
  `editora` VARCHAR(70),
  `idioma` VARCHAR(40),
  `paginas` INT,
  `ano` INT,
  `valor` DECIMAL(10,2)
);

CREATE TABLE `STOCK` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `id_books` INT,
  `id_stores` INT,
  `quantidade` INT
);

CREATE TABLE `EMPLOYEES` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(90),
  `matricula` varchar(10),
  `cargo` varchar(40),
  `email` varchar(90),
  `telefone` varchar(20),
  `data_de_nascimento` date,
  `cpf` varchar(14),
  `senha` varchar(8),
  `id_stores` integer
);

CREATE TABLE `CUSTOMERS` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(90),
  `email` VARCHAR(90),
  `telefone` VARCHAR(20),
  `data_de_nascimento` DATE,
  `cpf` VARCHAR(14),
  `senha` VARCHAR(8)
);

CREATE TABLE `SALES` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `id_customers` INT,
  `id_books` INT,
  `quantidade_adquirida` INT,
  `id_stores` INT,
  `data_compra` DATE,
  `horario_compra` TIME
);

ALTER TABLE `STOCK` ADD FOREIGN KEY (`id_books`) REFERENCES `BOOKS` (`id`);

ALTER TABLE `STOCK` ADD FOREIGN KEY (`id_stores`) REFERENCES `STORES` (`id`);

ALTER TABLE `EMPLOYEES` ADD FOREIGN KEY (`id_stores`) REFERENCES `STORES` (`id`);

ALTER TABLE `SALES` ADD FOREIGN KEY (`id_customers`) REFERENCES `CUSTOMERS` (`id`);

ALTER TABLE `SALES` ADD FOREIGN KEY (`id_books`) REFERENCES `BOOKS` (`id`);

ALTER TABLE `SALES` ADD FOREIGN KEY (`id_stores`) REFERENCES `STORES` (`id`);
