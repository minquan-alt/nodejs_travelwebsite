const websiteService = require('../services/WebsiteService')
const path = require('path')

class WebsiteController {
    async searchTours(req, res) {
        try {
            console.log(req.url)
            const result = await websiteService.searchTours(req.query)
            if (result.success) {
                console.log('After Search URL:', result.data) // Kiểm tra URL sau khi tìm kiếm
                res.render('tour/show', {
                    layout: false,
                    success: true,
                    tours: result.data,
                })
            } else {
                res.json({
                    success: false,
                })
            }
        } catch (err) {
            console.log('Error: ', err)
        }
    }
    async getHomePage(req, res) {
        try {
            const result = await websiteService.renderHomepage(req)
            const { tours, destinations, isLoggedIn, isAdmin } = result.data
            if (isAdmin) {
                return res.redirect('/admin')
            }
            console.log(tours)
            res.render('homepage', {
                tours: tours,
                destinations: destinations,
                isLoggedIn,
                path,
            })
        } catch (error) {
            console.log(error)
            res.status(500).send('Internal Server Error')
        }
    }
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error Logging out')
            }
            res.redirect('/homepage')
        })
    }

    uploadFile(req, res, next) {
        const file = req.file
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(file)
    }
    uploadMultiple(req, res, next) {
        const files = req.files
        if (!files) {
            const error = new Error('Please upload files')
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(files)
    }
}

module.exports = new WebsiteController()
