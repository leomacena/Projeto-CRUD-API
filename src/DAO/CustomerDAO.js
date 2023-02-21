const db = require('../infra/db');

class CustomerDAO {
  static listar() {
    const query = 'SELECT * FROM CUSTOMERS';
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  static buscarPorId(id) {
    const query = 'SELECT * FROM CUSTOMERS WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  }

  static inserir(customer) {
    const query = 'INSERT INTO CUSTOMERS (nome, email, telefone, data_de_nascimento, cpf, senha) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.run(query, [customer.nome, customer.email, customer.telefone, customer.data_de_nascimento, customer.cpf, customer.senha], (err) => {
        if (err) {
          reject(err);
        }
        resolve(customer);
      });
    });
  }

  static atualizar(cpf, customer) {
    const query = 'UPDATE CUSTOMERS SET nome = ?, email = ?, telefone = ?, data_de_nascimento = ?, cpf = ?, senha = ? WHERE cpf = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [customer.nome, customer.email, customer.telefone, customer.data_de_nascimento, customer.cpf, customer.senha, cpf], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Cliente atualizado com sucesso' });
      });
    });
  }

  static deletar(cpf) {
    const query = 'DELETE FROM CUSTOMERS WHERE cpf = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [cpf], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Cliente excluído com sucesso', cpf: cpf });
      });
    });
  }
}

module.exports = CustomerDAO;
