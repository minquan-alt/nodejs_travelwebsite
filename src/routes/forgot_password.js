const express = require('express')
const routerWeb = express.Router()
const forgotPasswordController = require('../controllers/ForgotPasswordController')

routerWeb.post('/', forgotPasswordController.checkUserValidation)
routerWeb.get('/', forgotPasswordController.getForgotPasswordForm)

module.exports = routerWeb
