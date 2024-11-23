const express = require('express')
const router = express.Router()
const adminController = require('../controllers/AdminController.js')
const adminMiddleware = require('../middlewares/AdminMiddleware.js')

router.post(
    '/customer_management/delete_all',
    adminController.deleteAllCustomers
)
router.delete('/customer_management/delete/:id', adminController.deleteCustomer)
router.post('/customer_management/update/:id', adminController.updateCustomer)
router.post('/customer_management/add', adminController.addCustomer)
router.get(
    '/tour_management',
    adminMiddleware,
    adminController.getTourManagement
)
router.get(
    '/customer_management',
    adminMiddleware,
    adminController.getCustomerManagement
)
router.get('/', adminMiddleware, adminController.getAdminDashboard)

module.exports = router
