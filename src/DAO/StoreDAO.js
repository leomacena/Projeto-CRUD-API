const db = require('../infra/db');

class StoreDAO {
  static listar() {
    const query = 'SELECT * FROM STORES';
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
    const query = 'SELECT * FROM STORES WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  }

  static inserir(store) {
    const query = 'INSERT INTO STORES (unidade, endereco, telefone, email, horario_abertura, horario_fechamento) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.run(query, [store.unidade, store.endereco, store.telefone, store.email, store.horario_abertura, store.horario_fechamento], (err) => {
        if (err) {
          reject(err);
        }
        resolve(store);
      });
    });
  }

  static atualizar(id, store) {
    const query = 'UPDATE STORES SET unidade = ?, endereco = ?, telefone = ?, email = ?, horario_abertura = ?, horario_fechamento = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [store.unidade, store.endereco, store.telefone, store.email, store.horario_abertura, store.horario_fechamento, id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Loja atualizada com sucesso' });
      });
    });
  }

  static deletar(id) {
    const query = 'DELETE FROM STORES WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Loja excluída com sucesso', id: id });
      });
    });
  }
}

module.exports = StoreDAO;
