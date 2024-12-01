const pool = require('../../config/connectDB')

const getTours = async (req, res) => {
    try {
        // Lấy user ID từ session hoặc sử dụng ID mặc định
        const id = req.session.user?.id || 62

        // Truy vấn lấy danh sách tour_id của user
        const tour_ids_query = 'SELECT tour_id FROM Tour_User WHERE user_id = ?'
        const [tour_ids_result] = await pool.query(tour_ids_query, [id])

        if (!tour_ids_result.length) {
            return res.status(404).json({
                message: 'No tours found for the user.',
                tours: [],
            })
        }

        // Lấy danh sách tour_id từ kết quả
        const tour_ids = tour_ids_result.map((row) => row.tour_id)

        // Truy vấn chi tiết các tour dựa trên danh sách tour_id
        const tours_query = `
            SELECT *
            FROM Tours 
            WHERE id IN (?)
        `
        const [tours_result] = await pool.query(tours_query, [tour_ids])

        // Trả về danh sách các tour
        return res.status(200).json({
            message: 'Tours fetched successfully.',
            tours: tours_result,
        })
    } catch (error) {
        console.error('Error fetching tours:', error)
        return res.status(500).json({
            message: 'An error occurred while fetching tours.',
            error: error.message,
        })
    }
}

module.exports = { getTours }
