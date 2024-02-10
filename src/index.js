const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const exp = require('constants');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');


//Connect to Database
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
//Middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Middleware cho HTTP logger
// app.use(morgan('combined'));

// Thiết lập template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');

// Tìm View
app.set('views', path.join(__dirname, 'resources', 'views')); // Sửa tại đây

console.log('PATH: ', path.join(__dirname, 'resources', 'views'));

// Page
// Roures Init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
