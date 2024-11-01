require('dotenv').config()
const config = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        server: process.env.DB_SERVER,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        options: process.env.DB_OPTIONS,
        connectionTimeout: Number(process.env.DB_CONNECTION_TIMEOUT),
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        server: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        server: '127.0.0.1',
        dialect: 'mysql',
    },
}

module.exports = config
