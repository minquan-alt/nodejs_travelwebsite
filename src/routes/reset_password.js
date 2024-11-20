const express = require('express')
const routerWeb = express.Router()
const resetPasswordController = require('../controllers/ResetPasswordController')

routerWeb.post('/', resetPasswordController.resetPassword)
routerWeb.get('/', resetPasswordController.getResetPasswordForm)

module.exports = routerWeb
