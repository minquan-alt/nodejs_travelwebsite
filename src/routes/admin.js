const express = require('express')
const router = express.Router()
const adminController = require('../controllers/AdminController.js')
const adminMiddleware = require('../middlewares/AdminMiddleware.js')
const multer = require('multer')
const fsExtrA = require('fs-extra')

// SET STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = 'src/public/uploads'
        if (!fsExtrA.existsSync(path)) {
            fsExtrA.mkdirSync(path)
        }
        cb(null, path)
    },
    filename: (req, file, cb) => {
        if (req.session && req.session.user && req.session.user.id) {
            cb(null, `${req.session.user.id}-${file.originalname}`)
        } else {
            // Handle cases where session or user ID is not available
            cb(new Error('User session or ID is missing'))
        }
    },
})
const upload = multer({ storage: storage })

router.post(
    '/customer_management/delete_all',
    adminController.deleteAllCustomers
)
router.delete('/customer_management/delete/:id', adminController.deleteCustomer)
router.post('/customer_management/update/:id', adminController.updateCustomer)
router.post('/customer_management/add', adminController.addCustomer)
router.get(
    '/customer_management',
    adminMiddleware,
    adminController.getCustomerManagement
)

router.post(
    '/tour_management/add',
    upload.single('image'),
    adminController.addTour
)
router.get(
    '/tour_management',
    adminMiddleware,
    adminController.getTourManagement
)
router.get('/', adminMiddleware, adminController.getAdminDashboard)

module.exports = router
