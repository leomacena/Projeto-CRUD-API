const db = require('../infra/db');

class EmployeesDAO {
  static listar() {
    const query = 'SELECT * FROM EMPLOYEES';
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
    const query = 'SELECT * FROM EMPLOYEES WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  }

  static inserir(employees) {
    const query = 'INSERT INTO livros (nome, matricula, cargo, email, telefone, nascimento, cpf, senha, id_stores) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.run(query, [employees.nome, employees.matricula, employees.cargo, employees.email, employees.telefone, employees.nascimento, employees.cpf, employees.senha, employees.id_stores], (err) => {
        if (err) {
          reject(err);
        }
        resolve(employees);
      });
    });
  }

  static atualizar(id, employees) {
    const query = 'UPDATE EMPLOYEES SET nome = ?, matricula = ?, cargo = ?, email = ?, telefone = ?, nascimento = ?, cpf = ?, senha = ?, id_stores = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [employees.nome, employees.matricula, employees.cargo, employees.email, employees.telefone, employees.nascimento, employees.cpf, employees.senha, employees.id_stores, id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Funcionário atualizado com sucesso' });
      });
    });
  }

  static excluir(id) {
    const query = 'DELETE FROM EMPLOYEES WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ mensagem: 'Funcionário excluído com sucesso', id: id });
      });
    });
  }
}

module.exports = EmployeesDAO;