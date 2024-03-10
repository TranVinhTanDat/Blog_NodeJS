// controller/AcooutController

const User = require('../models/User');

const AccountController = {
    async getAccount(reqk, res) {
        try {
            const user = await User.findById(reqk.user.userId);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error getting user:', error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = AccountController;