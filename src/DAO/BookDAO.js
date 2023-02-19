const db = require("../infra/db");

class BookDAO {
    static listar() {
        const query = "SELECT * FROM LIVROS"; 
        return new Promise((resolve, reject) => {
          db.all(query, (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows);
          });
        });
      }

    }
    

    module.exports = BookDAO;
