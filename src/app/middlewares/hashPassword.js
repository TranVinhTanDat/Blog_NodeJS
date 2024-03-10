// hashPasswordMiddleware.js
const bcrypt = require('bcryptjs');

const hashPasswordMiddleware = async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next(); // Pass next để tiếp tục xử lý
    } catch (error) {
        next(error); // Chuyển lỗi cho middleware tiếp theo hoặc controller để xử lý
    }
};

module.exports = hashPasswordMiddleware;
