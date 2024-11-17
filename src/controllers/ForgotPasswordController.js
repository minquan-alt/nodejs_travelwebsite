const e = require('express')
const db = require('../config/connectDB')
const forgotPasswordService = require('../services/ForgotPasswordService')

class ForgotPasswordController {
    async checkUserValidation(req, res) {
        try {
            const { email, phone } = req.body
            const validationResponse =
                await forgotPasswordService.checkUserValidation({
                    email,
                    phone,
                })
            if (!validationResponse.success) {
                return res.json({
                    success: false,
                    message: validationResponse.message,
                })
            } else {
                return res.json({
                    success: true,
                    message: validationResponse.message,
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'Đã xảy ra lỗi khi cập nhật mật khẩu',
            })
        }
    }
    getForgotPasswordForm(req, res) {
        return res.render('forgot_password', {
            layout: 'layouts/login',
        })
    }
}

module.exports = new ForgotPasswordController()
