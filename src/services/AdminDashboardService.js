const pool = require('../config/connectDB')

class AdminDashboardService {
    async getStatistic(req, res) {
        try {
            // Kiểm tra userId
            const userId = req.session.user.id
            if (!userId) {
                throw new Error('User is not authenticated')
            }

            // Các câu truy vấn
            const countCustomerQuery =
                'SELECT COUNT(*) AS customerCount FROM Customer_User WHERE user_id = ?'
            const countOrderQuery =
                'SELECT COUNT(*) AS completedOrderCount FROM Orders WHERE userId = ? AND status = ?'
            const countCancelledQuery =
                'SELECT COUNT(*) AS cancelledOrderCount FROM Orders WHERE userId = ? AND status = ?'
            const countPendingQuery =
                'SELECT COUNT(*) AS pendingOrderCount FROM Orders WHERE userId = ? AND status = ?'
            const countTourQuery =
                'SELECT COUNT(*) AS tourCount FROM Tour_User WHERE user_id = ?'

            // Thực hiện truy vấn
            const [[{ customerCount }]] = await pool.query(countCustomerQuery, [
                userId,
            ])
            const [[{ completedOrderCount }]] = await pool.query(
                countOrderQuery,
                [userId, 'Completed']
            )
            const [[{ cancelledOrderCount }]] = await pool.query(
                countCancelledQuery,
                [userId, 'Canceled']
            )
            const [[{ pendingOrderCount }]] = await pool.query(
                countPendingQuery,
                [userId, 'Pending']
            )
            const [[{ tourCount }]] = await pool.query(countTourQuery, [userId])

            const revenueQuery = `
                            SELECT 
                                MONTH(createdAt) AS month,
                                SUM(total_price) AS revenue
                            FROM Orders
                            WHERE userId = ? 
                                AND status = 'Completed'
                                AND createdAt >= CURDATE() - INTERVAL 12 MONTH
                            GROUP BY MONTH(createdAt)
                            ORDER BY MONTH(createdAt) DESC;
                            `

            // Thực hiện truy vấn
            const [revenueData] = await pool.query(revenueQuery, [userId])
            console.log('revenueData: ', revenueData)
            // Khởi tạo mảng doanh thu
            let monthlyRevenue = new Array(12).fill(0) // Mảng chứa doanh thu của 12 tháng

            // Điền dữ liệu vào mảng doanh thu
            revenueData.forEach((row) => {
                const monthIndex = row.month - 1 // Tháng từ 1-12, chuyển sang chỉ số mảng 0-11
                monthlyRevenue[monthIndex] = row.revenue || 0 // Gán doanh thu hoặc 0 nếu không có doanh thu cho tháng đó
            })

            console.log('Doanh thu của 12 tháng:', monthlyRevenue)

            // Trả về kết quả
            return {
                customerCount,
                completedOrderCount,
                cancelledOrderCount,
                pendingOrderCount,
                tourCount,
                monthlyRevenue,
            }
        } catch (error) {
            console.error('Error fetching statistics:', error.message)
            throw error // Hoặc trả về giá trị mặc định nếu cần
        }
    }
}

module.exports = new AdminDashboardService()
