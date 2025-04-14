const express = require('express');
const router = express.Router();
const signup = require('../controller/signupController');
const login = require('../controller/loginController');
const extractFromToken = require('../middleware/authMiddleware')
const logout = require('../controller/logoutController')

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', extractFromToken, logout);

module.exports = router;