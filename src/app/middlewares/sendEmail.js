// middlewares/sendEmail.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: subject,
            text: message
        });

        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        // Xử lý lỗi, ví dụ: gửi email cảnh báo cho admin
    }
};

module.exports = sendEmail;
