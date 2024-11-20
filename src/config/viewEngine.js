const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')

const configViewEngine = (app) => {
    app.use(express.static(path.join(__dirname, '..', 'public')))
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, '..', 'resources/views'))
    app.use(expressLayouts)
    app.set('layout', 'layouts/main')
    console.log(path.join(__dirname, '..', 'resources/views'))
}
module.exports = configViewEngine
