require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.PORT, // required for TiDB Cloud
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(process.env.CA),
    rejectUnauthorized: true // this should be true when CA is valid
  }
});

connection.connect((err) => {
  if (err) {
    console.error('❌ TiDB Cloud connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to TiDB Cloud!');
});

module.exports = connection;
