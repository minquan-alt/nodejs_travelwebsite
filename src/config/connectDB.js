const sql = require('mssql');
const config = require('./config');

const dbConfig = config.development;

const sqlConfig = {
    user: dbConfig.username, // đổi thành 'user'
    password: dbConfig.password,
    database: dbConfig.database,
    server: dbConfig.host, // dùng 'server' thay cho 'host'
    options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true
    }
    // connectionTimeout: dbConfig.connectionTimeout, // Nếu cần dùng connectionTimeout, đảm bảo nó có giá trị trong file config
};

async function connectDB() {
    try {
        const pool = await sql.connect(sqlConfig);
        console.log('Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
}

module.exports = connectDB;
