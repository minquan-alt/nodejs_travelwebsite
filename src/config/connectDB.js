const sql = require('mysql')
const config = require('./config')
const path = require('path')
const fs = require('fs')

const dbConfig = config.development

const sqlConfig = {
    user: dbConfig.username, // đổi thành 'user'
    password: dbConfig.password,
    database: dbConfig.database,
    server: dbConfig.host, // dùng 'server' thay cho 'host'
    port: Number(dbConfig.port),
    options: {
        encrypt: true,
        trustServerCertificate: true,
        ca: fs.readFileSync(path.join(__dirname, '../../certs/ca.pem')), // Đọc file CA certificate
    },
    connectionTimeout: dbConfig.connectionTimeout, // Nếu cần dùng connectionTimeout, đảm bảo nó có giá trị trong file config
}

async function connectDB() {
    try {
        const pool = await sql.createConnection(sqlConfig)
        console.log('Connected to SQL Server')
        return pool
    } catch (err) {
        console.error('Database connection failed:', err)
        throw err
    }
}

module.exports = connectDB
