const db = require('../infra/db');

class StockDAO {
  static listar() {
    const query = 'SELECT * FROM STOCK';
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
    const query = 'SELECT * FROM STOCK WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  }

  static inserir(stock) {
    const query = 'INSERT INTO STOCK (id_books, id_stores, quantidade) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.run(query, [stock.id_books, stock.id_stores, stock.quantidade], (err) => {
        if (err) {
          reject(err);
        }
        resolve(stock);
      });
    });
  }

  static atualizar(id, stock) {
    const query = 'UPDATE STOCK SET id_books = ?, id_stores = ?, quantidade = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [stock.id_books, stock.id_stores, stock.quantidade, id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Item atualizado com sucesso' });
      });
    });
  }

  static deletar(id) {
    const query = 'DELETE FROM STOCK WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Item excluído com sucesso', id: id });
      });
    });
  }
}

module.exports = StockDAO;