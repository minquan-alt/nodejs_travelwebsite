const db = require('../models/index')

class LoginController {
    getLoginForm(req, res) {
        return res.render('login', {
            layout: 'layouts/login',
        })
    }
}

module.exports = new LoginController()
