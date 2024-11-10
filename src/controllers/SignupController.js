const db = require('../models/index')

class SignupController {
    getSignupForm(req, res) {
        return res.render('signup', {
            layout: 'layouts/login',
        })
    }
}

module.exports = new SignupController()
