const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Tours',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            tour_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            days: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            nights: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            rating: {
                type: DataTypes.DECIMAL(3, 1),
                allowNull: true,
            },
            departure_location: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            tour_code: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            original_price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            discounted_price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            is_featured: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 0,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1,
            },
            month: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            type: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'Tours',
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
