require('dotenv').config()

const config = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql', // Đặt đúng dialect cho SQL Server
        dialectOptions: {
            ssl: {
<<<<<<< HEAD
                require: process.env.DB_SSL === 'true',
                rejectUnauthorized: false,
=======
              require: process.env.DB_SSL === 'true',
              rejectUnauthorized: false,
>>>>>>> origin
            },
        },
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
}

module.exports = config
