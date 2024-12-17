const express = require('express')
const router = express.Router()
const multer = require('multer')
const fsExtrA = require('fs-extra')
const { getTours } = require('../api/tour_management/get_tours')
const { get_one_tour } = require('../api/tour_management/get_one_tour')
const { update_tour } = require('../api/tour_management/update_tour')
const delete_tour = require('../api/tour_management/delete_tour')
const pool = require('../config/connectDB')
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
router.get('/destination-images/:id', async (req, res) => {
    const destinationId = req.params.id
    try {
        const [images] = await pool.query(
            'SELECT image_path FROM DestinationImages WHERE destination_id = ?',
            [destinationId]
        )
        res.json(images)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

router.post('/tour_management/delete_tour/:id', async (req, res) => {
    await delete_tour(req, res)
})
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
