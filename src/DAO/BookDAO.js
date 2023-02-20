const db = require('../infra/db');

class BookDAO {
  static listar() {
    const query = 'SELECT * FROM BOOkS';
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
    const query = 'SELECT * FROM BOOKS WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  }

  static inserir(book) {
    const query = 'INSERT INTO BOOKS (nome, autor, editora, idioma, paginas, ano, id_customers) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.run(query, [book.nome, book.autor, book.editora, book.idioma, book.paginas, book.ano, book.id_customers], (err) => {
        if (err) {
          reject(err);
        }
        resolve(book);
      });
    });
  }

  static atualizar(id, book) {
    const query = 'UPDATE BOOKS SET nome = ?, autor = ?, editora = ?, idioma = ?, paginas = ?, ano = ?, id_customers = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [book.nome, book.autor, book.editora, book.idioma, book.paginas, book.ano, book.id_customers, id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Livro atualizado com sucesso' });
      });
    });
  }

  static excluir(id) {
    const query = 'DELETE FROM BOOKS WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Livro excluído com sucesso', id: id });
      });
    });
  }
}

module.exports = BookDAO;
