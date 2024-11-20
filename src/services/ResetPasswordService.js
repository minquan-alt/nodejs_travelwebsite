const bcrypt = require('bcrypt')
const pool = require('../config/connectDB')

class ResetPasswordService {
    async hashPassword(password) {
        try {
            const genSalt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, genSalt)
            return hashedPassword
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async resetPasswordService(email, password) {
        try {
            const hashedPassword = await this.hashPassword(password)
            if (!hashedPassword) {
                console.log('Failed to hash password')
                return {
                    success: false,
                }
            }
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
