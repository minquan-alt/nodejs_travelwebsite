const express = require('express')
const routerWeb = express.Router()
const WebsiteController = require('../controllers/WebsiteController.js')
const multer = require('multer')
const fsExtrA = require('fs-extra')

// SET STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = '/img'
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

routerWeb.get('/tour_detail/', WebsiteController.getTourDetailPage)
routerWeb.get('/search', WebsiteController.searchTours)
routerWeb.get('/logout', WebsiteController.logout)
routerWeb.get('/homepage/logout', WebsiteController.logout)
routerWeb.get('/homepage', WebsiteController.getHomePage)
routerWeb.get('/', WebsiteController.getHomePage)
routerWeb.post(
    '/uploadFile',
    upload.single('uploaded_file'),
    WebsiteController.uploadFile
)
routerWeb.post(
    '/uploadMultiple',
    upload.array('uploaded_files', 12),
    WebsiteController.uploadMultiple
)
routerWeb.get('/tour_detail/:id', WebsiteController.getTourDetailPage);
// routerWeb.get('/cart', WebsiteController.viewCart); // Xem giỏ hàng
module.exports = routerWeb
