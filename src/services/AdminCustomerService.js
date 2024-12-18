const pool = require('../config/connectDB')

class AdminCustomerService {
    async getCustomers(req) {
        try {
            // lấy id của các khách hàng của admin
            const customer_user_ids_query =
                'SELECT customer_id FROM Customer_User WHERE user_id = ?'
            const customer_user_ids_params = [req.session.user.id]
            const [customer_user_ids] = await pool.query(
                customer_user_ids_query,
                customer_user_ids_params
            )
            const customer_ids = customer_user_ids.map((row) => row.customer_id)
            if (customer_ids.length === 0) {
                return {
                    success: false,
                    message: 'Chưa có khách hàng nào để hiển thị.',
                    data: [],
                }
            }
            const customer_ids_query = `SELECT * FROM Customers WHERE id IN (${customer_ids.map(() => '?').join(',')})`
            const [customers] = await pool.query(
                customer_ids_query,
                customer_ids
            )
            return {
                success: true,
                data: customers,
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
    async addCustomer(req) {
        const { full_name, gender, city, phone, email, dob, country } = req.body
        let connection

        try {
            connection = await pool.getConnection()
            await connection.beginTransaction()

            // add customer
            const query =
                'INSERT INTO Customers (full_name, city, phone, email, country) VALUES (?, ?, ?, ?, ?)'
            const queryParams = [full_name, city, phone, email, country]
            const [customer] = await connection.execute(query, queryParams)
            // add customer_user
            const customerUserQuery =
                'INSERT INTO Customer_User (customer_id, user_id) VALUES (?, ?)'
            const customerUserParam = [customer.insertId, req.session.user.id]
            const [customer_user] = await connection.execute(
                customerUserQuery,
                customerUserParam
            )
            console.log('Đã tạo customer_user mới: ', customer_user)

            await connection.commit()

            connection.release()
            return {
                success: true,
                message: 'Đã tạo customer mới thành công',
            }
        } catch (error) {
            await connection.rollback()
            console.error('Lỗi khi thêm khách hàng và customer_user: ', error)
            return {
                success: false,
                message: 'Đã xảy ra lỗi khi tạo khách hàng',
            }
        } finally {
            if (connection) connection.release()
        }
    }
    async deleteCustomer(id) {
        try {
            await pool.query('DELETE FROM Customers WHERE id = ?', [id])
            console.log('Xoá thành công')
            return {
                success: true,
                message: 'Đã xoá customer thành công',
            }
        } catch (error) {
            return {
                success: false,
                message: 'Đã xảy ra lỗi khi xoá khách hàng',
            }
        }
    }
    async updateCustomer(id, updatedData) {
        try {
            const query =
                'UPDATE Customers SET full_name = ?, city = ?, phone = ?, email = ?, country = ? WHERE id = ?'
            const [result] = await pool.query(query, [
                updatedData.full_name,
                updatedData.city,
                updatedData.phone,
                updatedData.email,
                updatedData.country,
                id,
            ])
            if (result.affectedRows === 1) {
                console.log('Update thành công')
                return {
                    success: true,
                    message: 'Đã cập nhật customer thành công',
                }
            }
            return {
                success: false,
                message: 'Đã cập nhật khách hàng thất bại',
            }
        } catch (error) {
            console.log('Lỗi truy vấn: ', error)
            return {
                success: false,
                message: 'Lỗi truy vấn',
            }
        }
    }
    async deleteAllCustomers(selectedIds) {
        selectedIds = selectedIds.map((id) => parseInt(id))
        const placeholders = selectedIds.map(() => '?').join(',')
        const query = `DELETE FROM Customers WHERE id IN (${placeholders})`
        try {
            await pool.query(query, selectedIds)
            return {
                success: true,
            }
        } catch (error) {
            console.log('Lỗi truy vấn: ', error)
            return {
                success: false,
                message: 'Lỗi khi truy vấn dữ liệu.',
            }
        }
    }
}
module.exports = new AdminCustomerService()
