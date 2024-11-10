

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
console.log(process.env.PORT)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`App is listening on: http://localhost:${PORT}`)
})
