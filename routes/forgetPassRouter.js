const express = require('express');
const router = express.Router();
const sendOTP = require('../controller/sendOTPController');
const verifyOTP = require('../controller/verifyOTPController');
const resetPass = require('../controller/resetPassController');

router.post('/send-otp', sendOTP);
router.post('/verify-otp',verifyOTP);
router.post('/reset-password',resetPass);

module.exports = router;