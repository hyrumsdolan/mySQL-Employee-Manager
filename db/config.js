const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    password: '',
    database: 'employee_db',
    user: 'root'
});

module.exports = connection;
