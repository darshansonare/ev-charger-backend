const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pass@123',
  database: 'charger_app'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

module.exports = connection;
