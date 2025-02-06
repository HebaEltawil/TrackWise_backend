const mongoose = require('mongoose');

const otpScheme = new mongoose.Schema({
    email: {type: String, required: true},
    otp: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, expires: '5m'}
});

module.exports = mongoose.model('OTP', otpScheme);