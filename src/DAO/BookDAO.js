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
    const query = 'INSERT INTO BOOKS (nome, autor, editora, idioma, paginas, ano, valor) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.run(query, [book.nome, book.autor, book.editora, book.idioma, book.paginas, book.ano, book.valor], (err) => {
        if (err) {
          reject(err);
        }
        resolve(book);
      });
    });
  }

  static atualizar(nome, book) {
    const query = 'UPDATE BOOKS SET nome = ?, autor = ?, editora = ?, idioma = ?, paginas = ?, ano = ?, valor = ? WHERE nome = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [book.nome, book.autor, book.editora, book.idioma, book.paginas, book.ano, book.id_customers, nome], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Livro atualizado com sucesso' });
      });
    });
  }

  static deletar(nome) {
    const query = 'DELETE FROM BOOKS WHERE nome = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [nome], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Livro excluído com sucesso', nome: nome });
      });
    });
  }
}

module.exports = BookDAO;
