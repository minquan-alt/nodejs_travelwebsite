const db = require('../config/connectDB')
const resetPasswordService = require('../services/ResetPasswordService')

class ResetPasswordController {
    async resetPassword(req, res) {
        console.log(req.body)
        const { email, password } = req.body
        const result = await resetPasswordService.resetPasswordService(
            email,
            password
        )
        if (result.success) {
            return res.json({
                success: true,
                message: 'Password reset successfully',
            })
        } else {
            return res.json({
                success: false,
                message: 'Password reset failed',
            })
        }
    }
    getResetPasswordForm(req, res) {
        return res.render('reset_password', {
            layout: 'layouts/login',
        })
    }
}

module.exports = new ResetPasswordController()
