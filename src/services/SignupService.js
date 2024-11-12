const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../models/index')
const User = db.User

const salt = bcrypt.genSaltSync(10)


class SignupService {
    hashUserPassword(password) {
        return new Promise(async (resolve, reject) => {
            try {
                const hashedPassword = await bcrypt.hashSync(password, salt)
                resolve(hashedPassword)
            } catch (error) {
                reject(error)
            }
        })
    }
    async createNewUser(userData) {
        try {
            // Tạo người dùng mới
            const newUser = await User.create(userData);
            return { success: true, user: newUser };
        } catch (error) {
            console.log(error)
            if (error.name === 'SequelizeUniqueConstraintError') {
                // Trả về lỗi nếu trùng lặp email hoặc phone
                return { success: false, message: 'Email hoặc số điện thoại đã tồn tại' };
            }
            // Xử lý lỗi khác (nếu có)
            return { success: false, message: 'Đã xảy ra lỗi khi tạo người dùng' };
        }
    }

}

module.exports = new SignupService()