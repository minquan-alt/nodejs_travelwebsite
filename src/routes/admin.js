const express = require('express')
const router = express.Router()
const adminController = require('../controllers/AdminController.js')
const adminMiddleware = require('../middlewares/AdminMiddleware.js')

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
router.get('/', adminMiddleware, adminController.getAdminPage)

module.exports = router
