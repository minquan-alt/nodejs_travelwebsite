const express = require('express')
const routerWeb = express.Router()
const loginController = require('../controllers/LoginController.js')

routerWeb.get('/forgot_password', loginController.getForgotPasswordForm)
routerWeb.get('/reset_password', loginController.getResetPasswordForm)
routerWeb.post('/', loginController.login)
routerWeb.get('/', loginController.getLoginForm)

module.exports = routerWeb
