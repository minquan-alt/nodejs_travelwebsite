const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Customers',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            full_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            gender: {
                type: DataTypes.ENUM('Male', 'Female', 'Other'),
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            dob: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            country: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'Customers',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
            ],
        }
    )
}
