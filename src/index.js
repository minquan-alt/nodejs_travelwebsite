// const path = require('path')
// const express = require('express')
// const morgan = require('morgan')
// const { engine } = require('express-handlebars')
// const app = express()
// const port = 3000
// const dotenv = require('dotenv')
// dotenv.config()

// const route = require('./routes')
// const db = require('./config/db')

// // connect db
// async function run() {
//     try {
//         const connection = await db.connect();
//         // Perform additional actions with the connection if needed
//     } catch (error) {
//         console.log("Failed to connect to the database.", error);
//     }
// }
// run()

// app.use(express.static(path.join(__dirname, 'public')))

// app.use(
//     express.urlencoded({
//         extended: true,
//     })
// )
// app.use(express.json())
// // HTTP Logger
// // app.use(morgan('combined'));

// // Template engine
// app.engine(
//     'hbs',
//     engine({
//         extname: '.hbs',
//     })
// )
// app.set('view engine', 'hbs')
// app.set('views', path.join(__dirname, 'resources', 'views'))

// // routes init
// route(app)

// app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`)
// })

const express = require('express')
const bodyParser = require('body-parser')
const initWebRoutes = require('./routes/index')
const viewEngine = require('./config/viewEngine')
const dotenv = require('dotenv')
const connectDB = require('./config/connectDB')

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

viewEngine(app)
initWebRoutes(app)
connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App is listening on: http://localhost:${PORT}`)
})
