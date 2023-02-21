const db = require('../infra/db');

class SalesDAO {
  static listar() {
    const query = 'SELECT * FROM SALES';
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
    const query = 'SELECT * FROM SALES WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  }

  static inserir(sale) {
    const query = 'INSERT INTO SALES (id_customers, id_books, quantidade_adquirida, id_stores, data_compra, horario_compra) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.run(query, [sale.id_customers, sale.id_books, sale.quantidade_adquirida, sale.id_stores, sale.data_compra, sale.horario_compra], (err) => {
        if (err) {
          reject(err);
        }
        resolve(sale);
      });
    });
  }

  static atualizar(id, sale) {
    const query = 'UPDATE SALES SET id_customers = ?, id_books = ?, quantidade_adquirida = ?, id_stores = ?, data_compra = ?, horario_compra = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [sale.id_customers, sale.id_books, sale.quantidade_adquirida, sale.id_stores, sale.data_compra, sale.horario_compra, id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Venda atualizada com sucesso' });
      });
    });
  }

  static deletar(id) {
    const query = 'DELETE FROM SALES WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Venda excluída com sucesso', id: id });
      });
    });
  }
}

module.exports = SalesDAO;
