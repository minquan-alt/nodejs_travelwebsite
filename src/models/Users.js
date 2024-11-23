const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Users',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            full_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            gender: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            dob: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: 'phone',
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: 'email',
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('user', 'admin'),
                allowNull: true,
                defaultValue: 'user',
            },
        },
        {
            sequelize,
            tableName: 'Users',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'phone',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'phone' }],
                },
                {
                    name: 'email',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'email' }],
                },
            ],
        }
    )
}
