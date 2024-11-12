const db = require('../models/index')

class ResetPasswordController {
    getResetPasswordForm(req, res) {
        return res.render('reset_password', {
            layout: 'layouts/login'
        })
    }
}

module.exports = new ResetPasswordController()
