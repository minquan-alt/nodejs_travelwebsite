'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            full_name: DataTypes.STRING,
            gender: DataTypes.STRING,
            dob: DataTypes.DATE,
            phone: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'Users', // Xác định tên bảng nếu cần thiết
            timestamps: true,  // Tự động quản lý các trường createdAt và updatedAt
        }
    )

    return User
}
