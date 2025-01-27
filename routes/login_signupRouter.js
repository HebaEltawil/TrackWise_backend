const express = require('express');
const router = express.Router();
const signup = require('../controller/signupController');
const login = require('../controller/loginController');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;