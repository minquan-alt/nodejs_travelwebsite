const express = require('express')
const routerWeb = express.Router()
const signupController = require('../controllers/SignupController.js')

routerWeb.get('/termsConditions', signupController.getTermsConditions)
routerWeb.get('/privacyPolicy', signupController.getPrivacyPolicy)
routerWeb.post('/', signupController.createNewUser)
routerWeb.get('/', signupController.getSignupForm)

module.exports = routerWeb
