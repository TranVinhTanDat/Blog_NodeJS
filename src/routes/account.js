// routes/account.js

const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');

router.get('/',accountController.getAccount);



module.exports = router;
