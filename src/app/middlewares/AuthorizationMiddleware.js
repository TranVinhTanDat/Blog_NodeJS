// AuthorizationMiddleware.js

const jwt = require('jsonwebtoken');

const AuthorizationMiddleware = async (req, res, next) => {
    try {
        // Kiểm tra xem header Authorization có tồn tại và hợp lệ không
        if (!req.headers.authorization || typeof req.headers.authorization !== 'string') {
            throw new Error('Authorization header is missing or invalid');
        }

        // Trích xuất token từ header Authorization
        const token = req.headers.authorization.split(' ')[1];

        // Xác thực và giải mã token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Kiểm tra vai trò của người dùng từ token
        const role = decodedToken.role;

        // Kiểm tra quyền truy cập của người dùng dựa trên vai trò
        if (role !== 'manager' && role !== 'admin') {
            throw new Error('Unauthorized');
        }

        // Gán vai trò và userId vào req.user để sử dụng trong các xử lý tiếp theo
        req.user = { userId: decodedToken.userId, role };

        // Cho phép đi tiếp đến middleware hoặc controller tiếp theo
        next();
    } catch (error) {
        console.error('Authorization error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = AuthorizationMiddleware;
