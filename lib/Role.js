const connection = require('../db/config');
const { Console } = require('console');
const { Transform } = require('stream');

class Role {
    getRoles() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    r.id, 
                    r.title, 
                    d.name AS department, 
                    r.salary 
                FROM roles r
                JOIN departments d ON r.department_id = d.id`;

            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    viewAllRoles() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    r.id, 
                    r.title, 
                    d.name AS department, 
                    r.salary 
                FROM roles r
                JOIN departments d ON r.department_id = d.id`;

            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    table(results);
                    resolve(results);
                }
            });
        });
    }
    addRole(title, salary, departmentId) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
            connection.query(query, [title, salary, departmentId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
}

function table(input) {
    // @see https://stackoverflow.com/a/67859384
    const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
    const logger = new Console({ stdout: ts })
    logger.table(input)
    const table = (ts.read() || '').toString()
    let result = '';
    for (let row of table.split(/[\r\n]+/)) {
      let r = row.replace(/[^┬]*┬/, '┌');
      r = r.replace(/^├─*┼/, '├');
      r = r.replace(/│[^│]*/, '');
      r = r.replace(/^└─*┴/, '└');
      r = r.replace(/'/g, ' ');
      result += `${r}\n`;
    }
    console.log(result);
  }

module.exports = Role;
