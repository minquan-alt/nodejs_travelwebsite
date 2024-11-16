const db = require('../config/connectDB')
const loginService = require('../services/LoginService')
const bcrypt = require('bcrypt')

class LoginController {
    getLoginForm(req, res) {
        return res.render('login', {
            layout: 'layouts/login',
        })
    }
    getForgotPasswordForm(req, res) {
        return res.render('forgot_password', {
            layout: 'layouts/login'
        })
    }
    getResetPasswordForm(req, res) {
        return res.render('signup', {
            layout: 'layouts/reset_password'
        })
    }
    async login(req, res) {
        try {
            const userData = {
                phone: req.body.phone,
                password: req.body.password
            }
            const result = await loginService.checkUserCredentials(userData)
            if(result.success){
                req.session.user = result.user
            }
            res.json({
                success: result.success,
                message: result.message,
            })
        } catch (error) {
            res.json({
                success: false,
                message: "Đã xảy ra lỗi. Vui lòng thử lại"
            })
        }
    }
}

module.exports = new LoginController()
