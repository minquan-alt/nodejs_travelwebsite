const adminCustomerService = require('../services/AdminCustomerService')

class AdminController {
    getAdminDashboard(req, res) {
        try {
            return res.render('admin_dashboard', {
                layout: 'layouts/admin',
            })
        } catch (error) {
            console.log('Error rendering customer: ', error)
        }
    }
    async getCustomerManagement(req, res) {
        try {
            const result = await adminCustomerService.getCustomers(req)
            if (result.success) {
                result.data = result.data.map((customer) => {
                    return {
                        ...customer,
                        dob: customer.dob.toLocaleDateString('vi-VN'),
                    }
                })
                return res.render('customer_management', {
                    layout: false,
                    customers: result.data,
                })
            }
            return res.render('customer_management', {
                layout: false,
                customers: result.data || [],
                message: 'Lỗi truy vấn',
            })
        } catch (error) {
            console.log('Lỗi tải trang:', error)
        }
    }

    updateCustomerDataView = async (req, res, methodResult) => {
        try {
            const result = await adminCustomerService.getCustomers(req)
            if (methodResult.success) {
                result.data = result.data.map((customer) => ({
                    ...customer,
                    dob: customer.dob.toLocaleDateString('vi-VN'),
                }))
                return res.render('admin_customer/show', {
                    layout: false,
                    success: true,
                    customers: result.data,
                })
            }
            return res.json({
                success: false,
                data: [],
                message: methodResult.message,
            })
        } catch (error) {
            console.log('Error updating customer data view:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    addCustomer = async (req, res) => {
        try {
            const addedResult = await adminCustomerService.addCustomer(req)
            await this.updateCustomerDataView(req, res, addedResult)
        } catch (error) {
            console.log('Error adding customer:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    updateCustomer = async (req, res) => {
        try {
            const updatedResult = await adminCustomerService.updateCustomer(
                req.params.id,
                req.body
            )
            console.log(req.body)
            await this.updateCustomerDataView(req, res, updatedResult)
        } catch (error) {
            console.log('Error updating customer:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    deleteCustomer = async (req, res) => {
        try {
            const deletedResult = await adminCustomerService.deleteCustomer(
                req.params.id
            )
            if (deletedResult.success) {
                return res.json({
                    success: true,
                })
            }
            return res.json({
                success: false,
                message: deletedResult.message,
            })
        } catch (error) {
            console.log('Error deleting customer:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    deleteAllCustomers = async (req, res) => {
        const selectedIds = req.body
        const deletedAllResult =
            await adminCustomerService.deleteAllCustomers(selectedIds)
        await this.updateCustomerDataView(req, res, deletedAllResult)
    }

    getTourManagement(req, res) {
        try {
            return res.render('tour_management', {
                layout: false,
            })
        } catch (error) {
            console.log('Error rendering tour management page')
        }
    }
}

module.exports = new AdminController()
