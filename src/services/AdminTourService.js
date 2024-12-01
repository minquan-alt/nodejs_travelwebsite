const pool = require('../config/connectDB')

class AdminTourService {
    async getTours(req) {
        try {
            const admin_id = req.session.user.id
            // lấy các tour_id của admin trong bảng Tour_User
            const tour_user_ids_query = `SELECT tour_id FROM Tour_User WHERE user_id = ?`
            const [tour_user_ids] = await pool.query(tour_user_ids_query, [
                admin_id,
            ])
            const tour_ids = tour_user_ids.map((row) => row.tour_id) // just take the value
            console.log('tour_ids: ', tour_ids) // debug

            // xử lí nếu không chứa ids
            if (tour_ids.length === 0) {
                return {
                    success: false,
                    message: 'Chưa có tour nào được đăng ký.',
                    data: [],
                }
            }

            // take placeholder
            const placeholder = tour_ids.map(() => '?').join(',')
            const tour_query = `SELECT * FROM Tours WHERE id IN (${placeholder})`
            const [tours] = await pool.query(tour_query, tour_ids)
            console.log('tours: ', tours)

            return {
                success: true,
                data: tours,
            }
        } catch (error) {
            console.log('error:', error)
            return {
                success: false,
                message: 'Lỗi truy vấn',
                data: [],
            }
        }
    }
    async addTours(req) {
        const {
            days,
            departure_location,
            description,
            discounted_price,
            is_active,
            is_featured,
            max_quantity_of_people,
            nights,
            original_price,
            status,
            time_back,
            time_go,
            tour_name,
            image,
            tour_code,
            nation,
        } = req.body
        let connection

        try {
            connection = await pool.getConnection()
            await connection.beginTransaction()
            // add tour
            const query =
                'INSERT INTO Tours (days, departure_location, description, discounted_price, is_active, is_featured, max_quantity_of_people, nights, original_price, status, time_back, time_go, tour_name, image, tour_code, nation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            const queryParams = [
                days,
                departure_location,
                description,
                discounted_price,
                is_active,
                is_featured,
                max_quantity_of_people,
                nights,
                original_price,
                status,
                time_back,
                time_go,
                tour_name,
                image,
                tour_code,
                nation,
            ]
            const [tour] = await connection.execute(query, queryParams)
            // add tour_user
            const tourUserQuery =
                'INSERT INTO Tour_User (tour_id, user_id) VALUES (?, ?)'
            const tourUserParam = [tour.insertId, req.session.user.id]
            const [tour_user] = await connection.execute(
                tourUserQuery,
                tourUserParam
            )
            console.log('Đã tạo tour_user mới: ', tour_user)

            await connection.commit()

            connection.release()
            return {
                success: true,
                message: 'Đã tạo tour mới thành công',
            }
        } catch (error) {
            await connection.rollback()
            console.error('Lỗi khi thêm tour: ', error)
            return {
                success: false,
                message: 'Đã xảy ra lỗi khi tạo tour',
            }
        } finally {
            if (connection) connection.release()
        }
    }
    
}


module.exports = new AdminTourService()
