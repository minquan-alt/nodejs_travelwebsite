'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class  Tour extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
     Tour.init(
        {
            tour_name: DataTypes.STRING,
            description: DataTypes.STRING,
            destination_id: DataTypes.INTEGER,
            image: DataTypes.STRING,
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
            price: DataTypes.STRING,
            capacity: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Tour',
        }
    )
    return  Tour
}
