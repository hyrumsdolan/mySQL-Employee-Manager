const connection = require('../db/config');

class Department {
    viewAllDepartments() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, name FROM departments';
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    console.table(results);
                    resolve(results);
                }
            });
        });
    }
}

module.exports = Department;
