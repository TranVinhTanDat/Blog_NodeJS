// routes/cart

const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');

const UserController = require('../app/controllers/UserController');
const authMiddleware = require('../app/middlewares/AuthMiddleware'); // Đổi tên middleware

router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.use(authMiddleware); // Sử dụng middleware ở đây

router.post('/add-to-cart', cartController.addToCart); // Thêm route mới ở đây
router.get('/', cartController.getCart);

module.exports = router;
