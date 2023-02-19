const db = require('../infra/db');

class BookDAO {
  static listar() {
    const query = 'SELECT * FROM livros';
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
    const query = 'SELECT * FROM livros WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  }

  static inserir(livro) {
    const query = 'INSERT INTO livros (nome, autor, editora, idioma, paginas, ano, id_customers) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.run(query, [livro.nome, livro.autor, livro.editora, livro.idioma, livro.paginas, livro.ano, livro.id_customers], (err) => {
        if (err) {
          reject(err);
        }
        resolve(livro);
      });
    });
  }

  static atualizar(id, livro) {
    const query = 'UPDATE livros SET nome = ?, autor = ?, editora = ?, idioma = ?, paginas = ?, ano = ?, id_customers = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [livro.nome, livro.autor, livro.editora, livro.idioma, livro.paginas, livro.ano, livro.id_customers, id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Livro atualizado com sucesso' });
      });
    });
  }

  static excluir(id) {
    const query = 'DELETE FROM livros WHERE id = ?';
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
