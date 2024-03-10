const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const AuthorizationMiddleware = require('../app/middlewares/AuthorizationMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', AuthorizationMiddleware, userController.logout); // Sử dụng middleware phân quyền
router.get('/', AuthorizationMiddleware, userController.getAllUsers); // Sử dụng middleware phân quyền
router.delete('/delete/:id', AuthorizationMiddleware, userController.deleteUser); // Sử dụng middleware phân quyền
router.put('/update/:id', AuthorizationMiddleware, userController.updateUser); // Sử dụng middleware phân quyền

// Xác nhận email
router.get('/confirm-email', async (req, res) => {
    try {
        // Xử lý xác nhận email ở đây
        // ...
        res.send('Email confirmed successfully');
    } catch (error) {
        console.error('Error confirming email:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
