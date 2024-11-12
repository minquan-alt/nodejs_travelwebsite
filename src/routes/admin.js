const express = require('express')
const routerWeb = express.Router()
const adminController = require('../controllers/AdminController.js')

routerWeb.get('/', adminController.getAdminPage)

module.exports = routerWeb