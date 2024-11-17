const bcrypt = require('bcrypt')
const signupService = require('../services/SignupService')

class SignupController {
    async createNewUser(req, res) {
        try {
            console.log(req.body)
            const userData = {
                full_name: req.body.full_name,
                gender: req.body.gender,
                dob: req.body.dob,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
            }
            console.log('userData: ', userData)
            const result = await signupService.createNewUser(userData)

            if (result.success) {
                req.session.user = result.user
                res.json({
                    success: true,
                })
            } else {
                res.json({
                    success: false, // Truyền biến success là false nếu có lỗi
                    message: result.message, // Truyền thông báo lỗi nếu có
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                message: 'Đã xảy ra lỗi. Vui lòng thử lại.',
            })
        }
    }

    getSignupForm(req, res) {
        return res.render('signup', {
            layout: 'layouts/login',
        })
    }
    getTermsConditions(req, res) {
        return res.render('terms_conditions', {
            layout: false,
        })
    }
    getPrivacyPolicy(req, res) {
        return res.render('PrivacyPolicy', {
            layout: false,
        })
    }
}

module.exports = new SignupController()
