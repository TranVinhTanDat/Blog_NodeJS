// middlewares/AuthMiddleware.js

const jwt = require('jsonwebtoken');

const AuthMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization || typeof req.headers.authorization !== 'string') {
            throw new Error('Authorization header is missing or invalid');
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Kiểm tra xem token có hết hạn không
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp <= currentTimestamp) {
            throw new Error('Token has expired');
        }

        req.user = { userId: decodedToken.userId };
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = AuthMiddleware;
