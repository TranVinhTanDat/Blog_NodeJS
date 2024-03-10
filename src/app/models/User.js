// models/user

const mongoose = require('mongoose');
const hashPasswordMiddleware = require('../middlewares/hashPassword');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'manager', 'admin'], default: 'user' } // Thêm trường role
});

// Áp dụng middleware hashPassword trước khi lưu người dùng vào cơ sở dữ liệu
UserSchema.pre('save', hashPasswordMiddleware);

module.exports = mongoose.model('User', UserSchema);
