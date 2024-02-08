const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Middleware cho HTTP logger
app.use(morgan('combined'));

// Thiết lập template engine
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // Sửa tại đây

console.log('PATH: ', path.join(__dirname, 'resources', 'views'));

// Page
app.get('/trangchu', (req, res) => {
  res.render('home');
});

app.get('/News', (req, res) => {
  res.render('news');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

