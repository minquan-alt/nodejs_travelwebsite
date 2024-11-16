const SequelizeAuto = require('sequelize-auto')
const path = require('path')
const fs = require('fs')

// read file config 

const configPath = path.join(__dirname, 'src/config/sequelize-auto-config.js')
if (!fs.existsSync(configPath)) {
    throw new Error('Config file not found. Please create src/config/sequelize-auto-config.js')
}

const config = require(configPath)

const auto = new SequelizeAuto(
    config.database,
    config.username,
    config.password, {
        host: config.host,
        dialect: config.dialect,
        port: config.port,
        directory: path.join(__dirname, config.output),
        additional: config.additional,
    }
)

auto.run((err) => {
    if(err) throw err;
    console.log('Model has been generated in: ', config.output)
})