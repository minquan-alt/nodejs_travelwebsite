// src/config/sequelize-auto-config.js
const config = require('./config').development // Import từ config.js

const sequelizeAutoConfig = {
  dialect: config.dialect,
  host: config.host,
  username: config.username,
  password: config.password,
  database: config.database,
  port: config.port,
  output: 'src/models',
  additional: {
      timestamps: false,
  }
  // Các tùy chọn khác nếu cần thiết
};

module.exports = sequelizeAutoConfig;
