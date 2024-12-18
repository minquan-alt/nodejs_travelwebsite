const adminCustomerService = require('../services/AdminCustomerService')
const adminTourService = require('../services/AdminTourService')
const adminRegisteredTourService = require('../services/AdminRegisteredTourService')
const adminDashboardService = require('../services/AdminDashboardService')

class AdminController {
    async getAdminDashboard(req, res) {
        try {
            const result = await adminDashboardService.getStatistic(req, res)
            const orders = await adminRegisteredTourService.getOrders(req, res)
            const customers = await adminCustomerService.getCustomers(req)

            return res.render('admin_dashboard', {
                layout: 'layouts/admin',
                count_cus: result.customerCount,
                count_ord: result.completedOrderCount,
                cancel_ord: result.cancelledOrderCount,
                pending_ord: result.pendingOrderCount,
                count_tour: result.tourCount,
                orders: orders.orders,
                customers: customers.data,
                monthlyRevenue: result.monthlyRevenue,
            })
        } catch (error) {
            console.log('Error rendering customer: ', error)
        }
    }

    async getRegisteredTourManagement(req, res) {
        try {
            const result = await adminRegisteredTourService.getOrders(req)
            return res.render('bookedTour_management', {
                layout: false,
                orders: result.orders,
            })
        } catch (error) {}
    }
    async getCustomerManagement(req, res) {
        try {
            const result = await adminCustomerService.getCustomers(req)
            if (result.success) {
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

    // Tour Management

    async getTourManagement(req, res) {
        try {
            const result = await adminTourService.getTours(req)
            if (result.success) {
                result.data = result.data.map((tour) => {
                    return {
                        ...tour,
                        time_go: tour.time_go.toLocaleDateString('vi-VN'),
                        time_back: tour.time_back.toLocaleDateString('vi-VN'),
                    }
                })
                return res.render('tour_management', {
                    layout: false,
                    tours: result.data,
                })
            }
            return res.render('tour_management', {
                layout: false,
                tours: result.data || [],
                message: 'Lỗi truy vấn',
            })
        } catch (error) {
            console.log('Lỗi tải trang:', error)
        }
    }
    async addTour(req, res) {
        const data = req.body
        data['image'] =
            `/uploads/${req.session.user.id}-${req.file.originalname}`
        try {
            const addResult = await adminTourService.addTours(req)
            if (addResult.success) {
                const result = await adminTourService.getTours(req)
                if (result.success) {
                    result.data = result.data.map((tour) => ({
                        ...tour,
                        time_go: tour.time_go.toLocaleDateString('vi-VN'),
                        time_back: tour.time_back.toLocaleDateString('vi-VN'),
                    }))
                    return res.render('admin_tour/show', {
                        layout: false,
                        success: true,
                        tours: result.data,
                    })
                }
                return res.json({
                    success: false,
                    data: [],
                    message: methodResult.message,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new AdminController()
