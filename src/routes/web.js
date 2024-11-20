const express = require('express')
const routerWeb = express.Router()
const WebsiteController = require('../controllers/WebsiteController.js')
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
        cb(null, Date.now() + '-' + file.originalname)
    },
})
const upload = multer({ storage: storage })

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

module.exports = routerWeb
