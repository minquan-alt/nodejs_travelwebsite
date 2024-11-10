const express = require('express')
const routerWeb = express.Router()
const SignupController = require('../controllers/SignupController.js')

routerWeb.get('/', SignupController.getSignupForm)

module.exports = routerWeb
