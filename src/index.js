const express = require('express')
const bodyParser = require('body-parser')
const initWebRoutes = require('./routes/index')
const viewEngine = require('./config/viewEngine')
const dotenv = require('dotenv')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const session = require('express-session')

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
)

viewEngine(app)
initWebRoutes(app)
console.log(process.env.PORT)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`App is listening on: http://localhost:${PORT}`)
})
