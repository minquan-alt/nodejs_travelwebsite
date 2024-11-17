const bcrypt = require('bcrypt') // Đảm bảo bạn đã import bcrypt
const connection = require('../config/connectDB')

class LoginService {
    async checkUserCredentials(userData) {
        console.log(userData)
        try {
            // Tìm người dùng theo số điện thoại
            const [result] = await connection.query(
                'SELECT * FROM Users WHERE phone = ? LIMIT 1',
                [userData.phone]
            )
            const user = result[0]
            // Nếu không tìm thấy người dùng
            if (!user) {
                return {
                    success: false,
                    message: 'Người dùng không tồn tại.',
                }
            }

            // So sánh mật khẩu

            const isMatch = await bcrypt.compare(
                userData.password,
                user.password
            )
            console.log('Mật khẩu gốc:', userData.password)
            console.log('Mật khẩu đã băm từ DB:', user.password)
            console.log(isMatch)
            if (!isMatch) {
                return {
                    success: false,
                    message: 'Mật khẩu không đúng.',
                }
            }
            // Đăng nhập thành công
            return {
                success: true,
                message:
                    'Người dùng đăng nhập thành công với số điện thoại và mật khẩu.',
                user: user,
            }
        } catch (error) {
            // Xử lý lỗi
            console.log(error)
            return error
        }
    }
}

module.exports = new LoginService()
