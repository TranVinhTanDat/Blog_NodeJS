    // UserController.js
    const { ObjectId } = require('mongoose').Types;
    const hashPasswordMiddleware = require('../middlewares/hashPassword');
    const jwt = require('jsonwebtoken');

    const User = require('../models/User');
    const bcrypt = require('bcryptjs');
    const sendEmail = require('../middlewares/sendEmail');
    // const { generateNewToken } = require('./CartController');



    const UserController = {

        async getAllUsers(req, res) {
            try {
                const users = await User.find();
                res.status(200).json(users);
            } catch (error) {
                console.error('Error getting users:', error);
                res.status(500).json({ message: error.message });
            }
        },

        async deleteUser(req, res) {
            try {
                const userId = req.params.id;
                const deletedUser = await User.findByIdAndDelete(userId);
                if (!deletedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json({ message: 'User deleted successfully' });
            } catch (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({ message: error.message });
            }
        },

        async updateUser(req, res) {
            try {
                const userId = req.params.id;
                const { username, email, password } = req.body;
                
                // Kiểm tra xem người dùng đã cung cấp mật khẩu mới hay không
                if (!password) {
                    // Nếu không có mật khẩu mới, chỉ cập nhật username và email
                    const updatedUser = await User.findByIdAndUpdate(
                        userId,
                        { username, email },
                        { new: true }
                    );
                    if (!updatedUser) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    return res.status(200).json(updatedUser);
                }
                
                // Nếu người dùng cung cấp mật khẩu mới, mã hóa mật khẩu và cập nhật thông tin người dùng
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { username, email, password: hashedPassword },
                    { new: true }
                );
                
                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                
                res.status(200).json(updatedUser);
            } catch (error) {
                console.error('Error updating user:', error);
                res.status(500).json({ message: error.message });
            }
        },
        
        

        async register(req, res) {
            try {
                const { username, email, password, confirmPassword, role } = req.body; // Thêm role từ request body
        
                if (!role || !['user', 'manager', 'admin'].includes(role)) {
                    return res.status(400).json({ message: 'Invalid role' });
                }
        
                if (password !== confirmPassword) {
                    return res.status(400).json({ message: 'Passwords do not match' });
                }
        
                const existingUser = await User.findOne({ $or: [{ username }, { email }] }); // Kiểm tra username hoặc email đã tồn tại
                if (existingUser) {
                    return res.status(400).json({ message: 'Username or Email already exists' });
                }
        
                const newUser = new User({ username, email, password, role }); // Thêm role vào constructor
                await newUser.save();
        
                // Gửi email xác nhận đăng ký
                const confirmationLink = `http://localhost:3000/confirm-email?email=${email}`;
                const emailSubject = 'Registration Confirmation';
                const emailMessage = `Thank you for registering! Please confirm your email address by clicking on the following link: ${confirmationLink}`;
                await sendEmail(email, emailSubject, emailMessage);
        
                res.status(201).json({ message: 'User registered successfully' });
            } catch (error) {
                console.error('Error registering user:', error);
                res.status(500).json({ message: error.message });
            }
        },
        
        
        // Các phương thức khác của UserController...

        

        async login(req, res) {
            try {
                const { username, email, password } = req.body;
    
                // Tìm người dùng trong cơ sở dữ liệu bằng username hoặc email
                const user = await User.findOne({ $or: [{ username }, { email }] });
    
                // Kiểm tra xem người dùng có tồn tại không
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
    
                // Kiểm tra tính đúng đắn của mật khẩu
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
    
                // Tạo token JWT với thông tin của người dùng
                const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
                // Gửi token JWT lại cho client
                res.status(200).json({ token });
            } catch (error) {
                console.error('Error logging in:', error);
                res.status(500).json({ message: error.message });
            }
        },

        async logout(req, res) {
            try {
                // Kiểm tra xem có tồn tại token trong header không
                if (!req.headers.authorization || typeof req.headers.authorization !== 'string') {
                    return res.status(400).json({ message: 'Authorization header is missing or invalid' });
                }
        
                // Lấy token từ header và kiểm tra định dạng
                const token = req.headers.authorization.split(' ')[1];
                if (!token) {
                    return res.status(400).json({ message: 'Token is missing' });
                }
        
                // Trả về thông báo đăng xuất thành công
                res.status(200).json({ message: 'Logout successful' });
            } catch (error) {
                console.error('Error logging out:', error);
                res.status(500).json({ message: error.message });
            }
        }
        
        
        
    };

    module.exports = UserController;

    // models/User.js