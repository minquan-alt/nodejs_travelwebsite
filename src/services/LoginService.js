const bcrypt = require('bcrypt'); // Đảm bảo bạn đã import bcrypt
const db = require('../models/index');
const { Op } = require('sequelize');
const User = db.User;

class LoginService {
    async checkUserCredentials(userData) {
        console.log(userData)
        console.log(db);  // Kiểm tra xem db có phải là đối tượng hợp lệ không
        console.log(User);
        try {
            // Tìm người dùng theo số điện thoại
            const user = await User.findOne({
                attributes: ['phone', 'password'],
                where: {
                    phone: userData.phone,
                }
            });

            // Nếu không tìm thấy người dùng
            if (!user) {
                return {
                    success: false,
                    message: "Người dùng không tồn tại."
                };
            }

            // So sánh mật khẩu
            console.log('password: ', userData.password)
            console.log('passwordDB: ', user.password)
            const isMatch = userData.password === user.password
            console.log(isMatch)
            if (!isMatch) {
                return {
                    success: false,
                    message: "Mật khẩu không đúng."
                };
            }

            // Đăng nhập thành công
            return {
                success: true,
                message: "Người dùng đăng nhập thành công với số điện thoại và mật khẩu.",
                user: user,
            };
        } catch (error) {
            // Xử lý lỗi
            return error
        }
    }
}

module.exports = new LoginService();
