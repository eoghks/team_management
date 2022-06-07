var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',//mysql user name을 넣으세요
    password: 'rla993',//비밀번호를 넣으세요
    database: 'homework'
});
db.connect();

module.exports = db;