const express = require('express')
const bodyParser = require('body-parser')
const initWebRoutes = require('./routes/index')
const viewEngine = require('./config/viewEngine')
const dotenv = require('dotenv')
const connectDB = require('./config/connectDB')
const expressLayouts = require('express-ejs-layouts')

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(expressLayouts)

viewEngine(app)
initWebRoutes(app)
connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App is listening on: http://localhost:${PORT}`)
})
