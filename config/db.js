require('dotenv').config({ path: '../.env' }); // or just `.env` if in same folder
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Local MySQL connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to Local MySQL!');
});

module.exports = connection;
