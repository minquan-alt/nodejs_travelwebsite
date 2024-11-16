const mysql = require('mysql2/promise'); // Dùng mysql2/promise để hỗ trợ async/await
const config = require('./config');
const path = require('path');
const fs = require('fs');

// Lấy cấu hình cơ sở dữ liệu
const dbConfig = config.development;

const sqlConfig = {
    host: dbConfig.host, // Sửa thành host
    user: dbConfig.username, // Đổi thành user
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, '../../certs/ca.pem')), // Đọc file CA certificate
    },
};

// Hàm kết nối
const pool = mysql.createPool(sqlConfig) // Tạo pool kết nối

console.log('Database pool created') // Xác nhận pool đã được tạo
module.exports = pool
