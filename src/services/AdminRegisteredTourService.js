const pool = require('../config/connectDB')

class AdminRegisteredTourService {
    async getOrders(req, res) {
        const userId = req.session.user.id
        const query = 'SELECT * FROM Orders WHERE userId = ?'
        const [result] = await pool.query(query, [userId])
        return {
            orders: result,
        }
    }
}

module.exports = new AdminRegisteredTourService()
