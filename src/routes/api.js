const express = require('express')
const router = express.Router()
const resetPasswordController = require('../controllers/ResetPasswordController')
const { getTours } = require('../api/tour_management/get_tours')
const { get_one_tour } = require('../api/tour_management/get_one_tour')
const { update_tour } = require('../api/tour_management/update_tour')

router.post('/tour_management/update_tour', async (req, res) => {
    await update_tour(req, res)
})
router.get('/tour_management/get_one_tour/:id', async (req, res) => {
    await get_one_tour(req, res)
})

router.get('/tour_management/get_tours', async (req, res) => {
    await getTours(req, res)
})
router.post('/', resetPasswordController.resetPassword)

module.exports = router
