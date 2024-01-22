const connection = require('../db/config');
const { Console } = require('console');
const { Transform } = require('stream');

class Employee {
    getEmployees() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    e.id, 
                    CONCAT(e.first_name, ' ', e.last_name) AS name,
                    r.title, 
                    d.name AS department, 
                    r.salary, 
                    CONCAT(m.first_name, ' ', m.last_name) AS manager 
                FROM employees e
                LEFT JOIN roles r ON e.role_id = r.id
                LEFT JOIN departments d ON r.department_id = d.id
                LEFT JOIN employees m ON m.id = e.manager_id`;
    
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
    viewAllEmployees() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    e.id, 
                    e.first_name, 
                    e.last_name, 
                    r.title, 
                    d.name AS department, 
                    r.salary, 
                    CONCAT(m.first_name, ' ', m.last_name) AS manager 
                FROM employees e
                LEFT JOIN roles r ON e.role_id = r.id
                LEFT JOIN departments d ON r.department_id = d.id
                LEFT JOIN employees m ON m.id = e.manager_id`;

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
    addEmployee(firstName, lastName, roleId, managerId) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            connection.query(query, [firstName, lastName, roleId, managerId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    updateEmployeeRole(employeeId, newRoleId) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
            connection.query(query, [newRoleId, employeeId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    updateEmployeeManager(employeeId, newManagerId) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE employees SET manager_id = ? WHERE id = ?';
            connection.query(query, [newManagerId, employeeId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    viewEmployeesByManager(managerId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM employees WHERE manager_id = ?';
            connection.query(query, [managerId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    table(results);
                    resolve(results);
                }
            });
        });
    }
    deleteEmployee(employeeId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM employees WHERE id = ?';
            connection.query(query, [employeeId], (err, result) => {
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

module.exports = Employee;
