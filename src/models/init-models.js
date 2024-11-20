var DataTypes = require('sequelize').DataTypes
var _Admins = require('./Admins')
var _Carts = require('./Carts')
var _Destinations = require('./Destinations')
var _Orders = require('./Orders')
var _Reviews = require('./Reviews')
var _SequelizeMeta = require('./SequelizeMeta')
var _Tours = require('./Tours')
var _Users = require('./Users')

function initModels(sequelize) {
    var Admins = _Admins(sequelize, DataTypes)
    var Carts = _Carts(sequelize, DataTypes)
    var Destinations = _Destinations(sequelize, DataTypes)
    var Orders = _Orders(sequelize, DataTypes)
    var Reviews = _Reviews(sequelize, DataTypes)
    var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes)
    var Tours = _Tours(sequelize, DataTypes)
    var Users = _Users(sequelize, DataTypes)

    Carts.belongsTo(Tours, { as: 'tour', foreignKey: 'tourId' })
    Tours.hasMany(Carts, { as: 'Carts', foreignKey: 'tourId' })
    Orders.belongsTo(Tours, { as: 'tour', foreignKey: 'tourId' })
    Tours.hasMany(Orders, { as: 'Orders', foreignKey: 'tourId' })
    Reviews.belongsTo(Tours, { as: 'tour', foreignKey: 'tourId' })
    Tours.hasMany(Reviews, { as: 'Reviews', foreignKey: 'tourId' })
    Carts.belongsTo(Users, { as: 'user', foreignKey: 'userId' })
    Users.hasMany(Carts, { as: 'Carts', foreignKey: 'userId' })
    Orders.belongsTo(Users, { as: 'user', foreignKey: 'userId' })
    Users.hasMany(Orders, { as: 'Orders', foreignKey: 'userId' })
    Reviews.belongsTo(Users, { as: 'user', foreignKey: 'userId' })
    Users.hasMany(Reviews, { as: 'Reviews', foreignKey: 'userId' })

    return {
        Admins,
        Carts,
        Destinations,
        Orders,
        Reviews,
        SequelizeMeta,
        Tours,
        Users,
    }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
