const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Customer_User',
        {
            customer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Customers',
                    key: 'id',
                },
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'Customer_User',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'customer_id' }, { name: 'user_id' }],
                },
                {
                    name: 'user_id',
                    using: 'BTREE',
                    fields: [{ name: 'user_id' }],
                },
            ],
        }
    )
}
