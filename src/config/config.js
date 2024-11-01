const config = {
    development: {
        username: 'wanmin',
        password: 'Quang123233',
        database: 'travel_website',
        server: 'wanmin.database.windows.net',
        host: 'wanmin.database.windows.net',
        dialect: 'mssql',
        options: {
            encrypt: true,
            trustServerCertificate: false,
        },
        connectionTimeout: 30000,
        logging: false,
    },
    test: {
        username: 'wanmin',
        password: 'Quang123233',
        database: 'travel_website_test', // Use a test database if available
        server: 'wanmin.database.windows.net',
        dialect: 'mssql',
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: false,
        },
        connectionTimeout: 30000,
    },
    production: {
        username: 'wanmin',
        password: 'Quang123233',
        database: 'travel_website_prod', // Use a production database if available
        server: 'wanmin.database.windows.net',
        dialect: 'mssql',
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: false,
        },
        connectionTimeout: 30000,
    },
}

module.exports = config
