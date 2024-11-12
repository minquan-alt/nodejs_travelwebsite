const express = require('express')
const routerWeb = express.Router()
const forgotPasswordController = require('../controllers/ForgotPasswordController')

routerWeb.get('/', forgotPasswordController.getForgotPasswordForm)

module.exports = routerWeb
