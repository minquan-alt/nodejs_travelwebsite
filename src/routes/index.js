const express = require('express')
const {
    getHomePage,
    getAboutPage,
    getRegisterPage,
} = require('../controllers/HomeController.js')

let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', getHomePage)
    router.get('/about', getAboutPage)
    router.get('/register', getRegisterPage)

    return app.use('/', router)
}

// function route(app) {
//     app.use('/api/v1/user', userRouter)
//     app.use('/search', searchRouter)

//     app.use('/news', newsRouter)
//     app.use('/', siteRouter)

// }

module.exports = initWebRoutes
