const path = require('path')
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')))
console.log(`dirname of public: ${__dirname}`)
// HTTP Logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({
  extname: '.hbs',
}));



app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'))
console.log("Views path:", path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
  res.render('home');
})
app.get('/news', (req, res) => {
  res.render('news')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
