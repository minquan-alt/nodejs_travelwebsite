const pool = require('../../config/connectDB')

const get_one_tour = async (req, res) => {
    try {
        const tour_query = `SELECT * FROM Tours WHERE id = ?`
        const [tour_result] = await pool.query(tour_query, [req.params.id])

        if (tour_result.length === 0) {
            console.log('No tour')
            return res.status(404).json({
                message: 'Tour không tồn tại',
                success: false,
                data: [],
            })
        }
        return res.status(200).json({
            message: 'Tour fetched successfully.',
            success: true,
            data: tour_result,
        })
    } catch (error) {
        console.error('Error fetching tour:', error)
        return res.status(500).json({
            message: 'An error occurred while fetching tour.',
            success: false,
            error: error.message,
        })
    }
}

module.exports = { get_one_tour }
