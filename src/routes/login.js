const express = require('express')
const routerWeb = express.Router()
const loginController = require('../controllers/LoginController.js')

routerWeb.get('/', loginController.getLoginForm)

module.exports = routerWeb
