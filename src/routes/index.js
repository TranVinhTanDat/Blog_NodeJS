const newRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');


const userRouter = require('./user');
const productRouter = require('./product');
const categoryRouter = require('./category');
const OrderRouter = require('./order');
const CartRouter = require('./cart');
const AccountRouter = require('./account');




function route(app) {
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
    app.use('/order', OrderRouter);
    app.use('/cart', CartRouter);
    app.use('/account', AccountRouter);




    app.use('/news', newRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
}

module.exports = route;
