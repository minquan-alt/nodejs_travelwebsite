const sql = require('mssql')
const config = require('./config')

const dbConfig = config.development

const sqlConfig = {
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    server: dbConfig.server,
    dialect: dbConfig.dialect,
    options: {
        encrypt: dbConfig.options.encrypt,
        enableArithAbort: dbConfig.enableArithAbort,
        trustServerCertificate: dbConfig.options.trustServerCertificate,
    },
    connectionTimeout: dbConfig.connectionTimeout,
}

async function connectDB() {
    try {
        const pool = await sql.connect(sqlConfig)
        console.log('Connected to SQL Server')
        return pool
    } catch (err) {
        console.error('Database connection failed:', err)
        throw err
    }
}

module.exports = connectDB

// const { Sequelize } = require('sequelize');

// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('travel_website', 'wanmin', 'Quang123233', {
//     server: "wanmin.database.windows.net",
//     host: "wanmin.database.windows.net",
//     dialect: "mssql",
//     options: {
//       encrypt: true,
//       trustServerCertificate: false,
//     },
//     connectionTimeout: 30000,
// })

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// module.exports = connectDB
