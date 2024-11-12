const express = require('express')
const app = express()
const path = require('path')

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Serve static files (for CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')))

// Route to render main page
app.get('/', (req, res) => {
    res.render('main')
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
