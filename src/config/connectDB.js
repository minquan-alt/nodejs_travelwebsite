const mysql = require('mysql2/promise') // Dùng mysql2/promise để hỗ trợ async/await
const config = require('./config')
const path = require('path')
const fs = require('fs')

// Lấy cấu hình cơ sở dữ liệu
const dbConfig = config.development

const connection = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 30000,
    queueLimit: 0,
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, '../../certs/ca.pem')), // Đọc file CA certificate
    },
})
if (!connection) {
    console.log('Database connection failed') // Xác nhận kết nối thất bại
} else console.log('Database pool created') // Xác nhận pool đã được tạo
module.exports = connection // Xuất connection để sử dụng ở các file khác
