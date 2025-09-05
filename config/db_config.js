const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    user: process.env.DB_USER || 'root',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'rocked_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function dbConnection(sql, data, print_sql) {
    let [result] = await pool.query(sql, data);

    if (print_sql) {
        console.log(mysql.format(sql, data));
    }

    return result;
}

module.exports = dbConnection;