const db = require('../models/index')

class WebsiteController {
    async getHomePage(req, res){
        try {
            // const { page = 1, limit = 10} = req.query
            // const offset = (page - 1) * limit

            const data = await db.Tour.findAll({
                attributes: ['tour_name', 'description', 'image'],
            })
            const isLoggedIn = req.session && req.session.user
            res.render('homepage', { tours: data, isLoggedIn, });
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error")
        }
    }
    getRegisterPage(req, res){
        res.send('Register Page')
    }
    getUser(req, res){
        res.send('User page')
    }
    getUserCart(req, res){
        res.send('User cart')
    }
    getUserParams(req, res){
        res.send(req.params)
    }
    getFormData(req, res){
        res.render('form_data')
    }
    uploadFile(req, res, next){
        const file = req.file
        if (!file){
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(file)
    }
    uploadMultiple(req, res, next){
        const files = req.files
        if (!files){
            const error = new Error('Please upload files')
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(files)
    }
}

module.exports = new WebsiteController()
