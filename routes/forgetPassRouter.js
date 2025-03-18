const express = require('express');
const router = express.Router();
const extractFromToken = require('../middleware/authMiddleware');
const sendOTP = require('../controller/forgetPassword/sendOTPController');
const verifyOTP = require('../controller/forgetPassword/verifyOTPController');
const resetPass = require('../controller/forgetPassword/resetPassController');

router.post('/send-otp', sendOTP);
router.post('/verify-otp',extractFromToken,verifyOTP);
router.post('/reset-password',extractFromToken,resetPass);

module.exports = router;