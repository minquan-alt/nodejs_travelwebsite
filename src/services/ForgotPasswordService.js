const bcrypt = require('bcrypt')
const connection = require('../config/connectDB')

class ForgotPasswordService {
    async checkUserValidation(data) {
        try {
            const { email, phone } = data
            console.log(email, phone)
            const checkQuery =
                'SELECT * FROM Users WHERE email = ? AND phone = ? limit 1'
            const checkValues = [email, phone]
            const [validUser] = await connection.query(checkQuery, checkValues)
            if (validUser.length === 0) {
                return {
                    success: false,
                    message: 'Email hoặc số điện thoại không tồn tại',
                }
            } else {
                return {
                    success: true,
                    message: 'Email và số điện thoại tồn tại',
                }
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: 'Đã xảy ra lỗi khi cập nhật mật khẩu',
            }
        }
    }
}
module.exports = new ForgotPasswordService()
