const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const exp = require('constants');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');
const SortMiddleware = require('./app/middlewares/SortMiddleware'); // appline vào tất cả requset


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

app.use(methodOverride('_method'))

// Middleware cho HTTP logger
// app.use(morgan('combined'));


// Custom middleware (những Middleware do chúng ta tự tạo ra và app line cho toàn bộ trang web)
app.use(SortMiddleware);
// ====***=====


// Thiết lập template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';                       // kiểm tra field(tên cột) mà đã bấm vào không.    

                const icons = {
                    default:'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc:'oi oi-sort-descending',
                }
                const types = {
                    default: 'desc',  // trong lượt bấm lần đầu tiên thì ra icon gì và sắp xếp ra sao.
                    asc: 'desc',
                    desc: 'asc'
                }

                const icon = icons[sortType]
                const type = types[sortType]

                return `<a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>`;
            }
        },
    }),
);

app.set('view engine', 'hbs');

// Tìm View
app.set('views', path.join(__dirname, 'resources', 'views')); // Sửa tại đây

// console.log('PATH: ', path.join(__dirname, 'resources', 'views'));


// Roures Init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
