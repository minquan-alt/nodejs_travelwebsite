const express = require('express')
const routerAdmin = require('./admin')
const routerWeb = require('./web')
//const routerShowForm = require

let initWebRoutes = (app) => {
    app.use('/admin', routerAdmin)
    app.use('/', routerWeb)
}

// function route(app) {
//     app.use('/api/v1/user', userRouter)
//     app.use('/search', searchRouter)

//     app.use('/news', newsRouter)
//     app.use('/', siteRouter)

// }

module.exports = initWebRoutes
