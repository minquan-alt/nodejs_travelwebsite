const pool = require('../../config/connectDB')

const update_tour = async (req, res) => {
    const updatedData = req.body // Dữ liệu được gửi từ client

    const { tourId } = updatedData // Giả sử bạn nhận tourId để xác định tour cần cập nhật

    // Truy vấn cơ sở dữ liệu để lấy dữ liệu tour hiện tại
    const sql = 'SELECT * FROM tours WHERE id = ?'

    db.query(sql, [tourId], (err, results) => {
        if (err) {
            console.error('Error fetching tour data:', err)
            return res
                .status(500)
                .json({ success: false, message: 'Database error' })
        }

        if (results.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: 'Tour not found' })
        }

        const existingTour = results[0] // Lấy dữ liệu tour hiện tại

        // Kiểm tra sự thay đổi và chuẩn bị đối tượng cập nhật
        let updateFields = []

        for (let key in updatedData) {
            if (updatedData[key] !== existingTour[key]) {
                updateFields.push(`${key} = ?`)
            }
        }

        if (updateFields.length === 0) {
            return res.json({ success: false, message: 'No changes detected' })
        }

        const updateValues = Object.values(updatedData).filter(
            (value, index) => {
                const key = Object.keys(updatedData)[index]
                return updatedData[key] !== existingTour[key]
            }
        )

        const updateSql = `UPDATE tours SET ${updateFields.join(', ')} WHERE id = ?`

        db.query(updateSql, [...updateValues, tourId], (err, result) => {
            if (err) {
                console.error('Error updating tour data:', err)
                return res
                    .status(500)
                    .json({ success: false, message: 'Database error' })
            }

            return res.json({
                success: true,
                message: 'Tour updated successfully',
            })
        })
    })
}

module.exports = { update_tour }
