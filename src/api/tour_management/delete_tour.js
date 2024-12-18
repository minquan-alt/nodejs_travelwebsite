const pool = require('../../config/connectDB')

const delete_tour = async (req, res) => {
    try {
        await pool.query('DELETE FROM Tours WHERE id = ?', [req.params.id])
        console.log('delete one tour successful')
        return res.json({
            success: true,
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
        })
    }
}

module.exports = delete_tour
