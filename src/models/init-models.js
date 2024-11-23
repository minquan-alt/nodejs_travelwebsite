var DataTypes = require('sequelize').DataTypes
var _Admins = require('./Admins')
var _Carts = require('./Carts')
var _Customer_User = require('./Customer_User')
var _Customers = require('./Customers')
var _Destinations = require('./Destinations')
var _Orders = require('./Orders')
var _Reviews = require('./Reviews')
var _SequelizeMeta = require('./SequelizeMeta')
var _Tours = require('./Tours')
var _Users = require('./Users')

function initModels(sequelize) {
    var Admins = _Admins(sequelize, DataTypes)
    var Carts = _Carts(sequelize, DataTypes)
    var Customer_User = _Customer_User(sequelize, DataTypes)
    var Customers = _Customers(sequelize, DataTypes)
    var Destinations = _Destinations(sequelize, DataTypes)
    var Orders = _Orders(sequelize, DataTypes)
    var Reviews = _Reviews(sequelize, DataTypes)
    var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes)
    var Tours = _Tours(sequelize, DataTypes)
    var Users = _Users(sequelize, DataTypes)

    Customers.belongsToMany(Users, {
        as: 'user_id_Users',
        through: Customer_User,
        foreignKey: 'customer_id',
        otherKey: 'user_id',
    })
    Users.belongsToMany(Customers, {
        as: 'customer_id_Customers',
        through: Customer_User,
        foreignKey: 'user_id',
        otherKey: 'customer_id',
    })
    Customer_User.belongsTo(Customers, {
        as: 'customer',
        foreignKey: 'customer_id',
    })
    Customers.hasMany(Customer_User, {
        as: 'Customer_Users',
        foreignKey: 'customer_id',
    })
    Carts.belongsTo(Tours, { as: 'tour', foreignKey: 'tourId' })
    Tours.hasMany(Carts, { as: 'Carts', foreignKey: 'tourId' })
    Orders.belongsTo(Tours, { as: 'tour', foreignKey: 'tourId' })
    Tours.hasMany(Orders, { as: 'Orders', foreignKey: 'tourId' })
    Reviews.belongsTo(Tours, { as: 'tour', foreignKey: 'tourId' })
    Tours.hasMany(Reviews, { as: 'Reviews', foreignKey: 'tourId' })
    Carts.belongsTo(Users, { as: 'user', foreignKey: 'userId' })
    Users.hasMany(Carts, { as: 'Carts', foreignKey: 'userId' })
    Customer_User.belongsTo(Users, { as: 'user', foreignKey: 'user_id' })
    Users.hasMany(Customer_User, {
        as: 'Customer_Users',
        foreignKey: 'user_id',
    })
    Orders.belongsTo(Users, { as: 'user', foreignKey: 'userId' })
    Users.hasMany(Orders, { as: 'Orders', foreignKey: 'userId' })
    Reviews.belongsTo(Users, { as: 'user', foreignKey: 'userId' })
    Users.hasMany(Reviews, { as: 'Reviews', foreignKey: 'userId' })

    return {
        Admins,
        Carts,
        Customer_User,
        Customers,
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
