const connection = require('../db/config');

class Query {
    executeQuery(sql) {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

// module.exports = Query;
