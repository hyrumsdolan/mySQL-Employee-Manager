const connection = require('../db/config');
const { Console } = require('console');
const { Transform } = require('stream');

class Department {
    getDepartments() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, name FROM departments';
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    viewAllDepartments() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, name FROM departments';
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
    addDepartment(departmentName) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO departments (name) VALUES (?)';
            connection.query(query, [departmentName], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    viewEmployeesByDepartment(departmentId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT employees.* FROM employees
                JOIN roles ON employees.role_id = roles.id
                WHERE roles.department_id = ?`;
            connection.query(query, [departmentId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    table(results);
                    resolve(results);
                }
            });
        });
    }
    deleteDepartment(departmentId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM departments WHERE id = ?';
            connection.query(query, [departmentId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    viewDepartmentBudget(departmentId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT SUM(roles.salary) AS total_budget
                FROM employees
                JOIN roles ON employees.role_id = roles.id
                WHERE roles.department_id = ?`;
            connection.query(query, [departmentId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Total Utilized Budget: ${results[0].total_budget}`);
                    resolve(results[0].total_budget);
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

module.exports = Department;
