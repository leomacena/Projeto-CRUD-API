const db = require('../infra/db');

class ClientDAO {
  static listar() {
    const query = 'SELECT * FROM clientes';
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
    const query = 'SELECT * FROM clientes WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  }

  static inserir(cliente) {
    const query = 'INSERT INTO clientes (nome, email, telefone, data_nascimento, cpf, senha) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.run(query, [cliente.nome, cliente.email, cliente.telefone, cliente.data_nascimento, cliente.cpf, cliente.senha], (err) => {
        if (err) {
          reject(err);
        }
        resolve(cliente);
      });
    });
  }

  static atualizar(id, cliente) {
    const query = 'UPDATE clientes SET nome = ?, email = ?, telefone = ?, data_nascimento = ?, cpf = ?, senha = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [cliente.nome, cliente.email, cliente.telefone, cliente.data_nascimento, cliente.cpf, cliente.senha, id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Cliente atualizado com sucesso' });
      });
    });
  }

  static excluir(id) {
    const query = 'DELETE FROM clientes WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Cliente excluído com sucesso', id: id });
      });
    });
  }
}

module.exports = ClientDAO;
