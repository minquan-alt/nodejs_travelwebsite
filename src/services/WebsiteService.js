const pool = require('../config/connectDB')

class WebsiteService {
    async searchTours(req) {
        try {
            let query = 'SELECT * FROM Tours WHERE 1=1'
            let queryParams = []

            if (
                req.departure_location &&
                req.departure_location !== 'undefined'
            ) {
                query += ' AND departure_location = ?'
                queryParams.push(req.departure_location)
            }

            if (req.month && req.month !== 'undefined') {
                query += ' AND month = ?'
                queryParams.push(parseInt(req.month.replace('Tháng ', '')))
            }

            if (req.type && req.type !== 'undefined') {
                query += ' AND type = ?'
                queryParams.push(req.type)
            }
            console.log('query', query)
            console.log('queryParams: ', queryParams)

            // Thực thi truy vấn với các tham số đã chuẩn bị
            const [rows] = await pool.query(query, queryParams)
            console.log(rows)

            return {
                success: true,
                data: rows,
            }
        } catch (err) {
            console.log('Error query: ', err)
            return {
                sucess: false,
                message: 'Lỗi truy vấn',
            }
        }
    }
    async renderHomepage(req) {
        try {
            const [tours] = await pool.query('SELECT * FROM Tours')
            const [destinations] = await pool.query(
                'SELECT * FROM Destinations'
            )
            let isLoggedIn = false
            let isAdmin = false

            if (req.session && req.session.user) {
                isLoggedIn = true
                const { role } = req.session.user
                if (role === 'admin') {
                    isAdmin = true
                }
            }
            console.log('isAdmin: ', isAdmin)

            return {
                success: true,
                data: {
                    tours,
                    destinations,
                    isLoggedIn,
                    isAdmin,
                },
            }
        } catch (error) {
            console.log(error)
            throw new Error('Error rendering homepage')
        }
    }
}
module.exports = new WebsiteService()
