const express = require('express')
const routerAdmin = require('./admin')
const routerWeb = require('./web')
const routerLogin = require('./login')
const routerSignup = require('./signup')
//const routerShowForm = require

let initWebRoutes = (app) => {
    app.use('/signup', routerSignup)
    app.use('/login', routerLogin)
    app.use('/admin', routerAdmin)
    app.use('/', routerWeb)
}

module.exports = initWebRoutes
