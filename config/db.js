require('dotenv').config({ path: '../.env' }); // Load .env from parent folder
const fs = require('fs');
const mysql = require('mysql2');
const path = require('path');

// Read CA certificate (correct relative path from db.js to certificate folder)
const ca = fs.readFileSync(path.join(__dirname, '../certificate/isrgrootx1.pem'), 'utf8');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: ca,
    rejectUnauthorized: true
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
