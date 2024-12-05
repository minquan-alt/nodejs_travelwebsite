const pool = require('../../config/connectDB')

const update_tour = async (req, res) => {
    try {
        const tourId = req.params.id // ID của tour cần cập nhật
        const updatedData = req.body // Dữ liệu form
        const file = req.file // File upload (nếu có)

        console.log('Updated Data:', updatedData)
        console.log('Uploaded File:', file)

        // Kiểm tra xem tour có tồn tại không
        const checkSql = 'SELECT * FROM Tours WHERE id = ?'
        const [existingTour] = await pool.query(checkSql, [tourId])

        if (existingTour.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: 'Tour not found' })
        }

        // Chuẩn bị dữ liệu cập nhật
        const updateFields = []
        const updateValues = []

        for (const key in updatedData) {
            if (updatedData[key] !== existingTour[0][key]) {
                updateFields.push(`${key} = ?`)
                updateValues.push(updatedData[key])
            }
        }

        // Nếu có file upload, cập nhật đường dẫn file
        if (file) {
            updateFields.push(`image = ?`)
            updateValues.push(file.path) // Lưu đường dẫn file vào database
        }

        if (updateFields.length === 0) {
            return res.json({ success: false, message: 'No changes detected' })
        }

        updateValues.push(tourId)

        const updateSql = `UPDATE Tours SET ${updateFields.join(', ')} WHERE id = ?`
        console.log(updateSql)
        const [updateResult] = await pool.query(updateSql, updateValues)

        if (updateResult.affectedRows > 0) {
            return res.json({
                success: true,
                message: 'Tour updated successfully',
            })
        } else {
            return res
                .status(500)
                .json({ success: false, message: 'Failed to update tour' })
        }
    } catch (error) {
        console.error('Error updating tour:', error)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

module.exports = { update_tour }
