const bcrypt = require('bcrypt')
const pool = require('../config/connectDB')
const hashPassword = require('../utils/hashPassword')

class ResetPasswordService {
    async resetPasswordService(email, password) {
        try {
            const hashedPassword = await hashPassword(password)
            const query = 'UPDATE Users SET password = ? WHERE email = ?'
            const queryValues = [hashedPassword, email]
            const [rows] = await pool.query(query, queryValues)
            return {
                success: true,
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
            }
        }
    }
}
module.exports = new ResetPasswordService()
