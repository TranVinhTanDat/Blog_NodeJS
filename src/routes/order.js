// routes/order
const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');

const UserController = require('../app/controllers/UserController');
const authMiddleware = require('../app/middlewares/AuthMiddleware'); // Đổi tên middleware

router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.use(authMiddleware); // Sử dụng middleware ở đây

router.post('/create', orderController.createOrder);
router.put('/update/:id', orderController.updateOrder);
router.delete('/delete/:id', orderController.deleteOrder);


router.get('/', orderController.getAllOrders);

module.exports = router;
