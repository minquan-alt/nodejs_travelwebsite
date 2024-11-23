const bcrypt = require('bcrypt')
const connection = require('../config/connectDB')
const hashPassword = require('../utils/hashPassword')

class SignupService {
    async createNewUser(userData) {
        try {
            const { full_name, gender, dob, phone, email, password } = userData
            // Check if email or phone already exists
            const checkQuery =
                'SELECT * FROM Users WHERE email = ? OR phone = ? limit 1'
            const checkValues = [email, phone]

            const [existingUser] = await connection.query(
                checkQuery,
                checkValues
            )

            if (existingUser.length > 0) {
                return {
                    success: false,
                    message: 'Email hoặc số điện thoại đã tồn tại',
                }
            }
            const hashedPassword = await hashPassword(password)
            const query =
                'INSERT INTO Users (full_name, gender, dob, phone, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())'
            const values = [
                full_name,
                gender,
                dob,
                phone,
                email,
                hashedPassword,
            ]
            const [result] = await connection.query(query, values)
            console.log('Đã tạo người dùng mới:', result)
            return {
                success: true,
                user: userData,
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: 'Đã xảy ra lỗi khi tạo người dùng',
            }
        }
    }
}

module.exports = new SignupService()
