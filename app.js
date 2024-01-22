const connection = require('./db/config');
const { mainMenu } = require('./utils/inquirerMenus');


connection.connect(err => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);

    mainMenu();
});



process.on('exit', () => {
    connection.end();
});
