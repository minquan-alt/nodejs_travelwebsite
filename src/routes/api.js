const express = require('express')
const router = express.Router()
const multer = require('multer')
const fsExtrA = require('fs-extra')
const { getTours } = require('../api/tour_management/get_tours')
const { get_one_tour } = require('../api/tour_management/get_one_tour')
const { update_tour } = require('../api/tour_management/update_tour')

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

// Định nghĩa route xử lý
router.post(
    '/tour_management/update_tour/:id',
    upload.single('image'),
    async (req, res) => {
        await update_tour(req, res)
    }
)

router.get('/tour_management/get_one_tour/:id', async (req, res) => {
    await get_one_tour(req, res)
})

router.get('/tour_management/get_tours', async (req, res) => {
    await getTours(req, res)
})

module.exports = router
