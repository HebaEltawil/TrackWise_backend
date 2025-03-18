require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const OTP = require('../../model/otpModel');

const verifyOTP = async (req,res) => {
    const {otp} = req.body;
    const email = req.userEmail;

    if(!otp){
        return res.status(400).json({ message: 'OTP are required' });
    }
    try {
        const findOTP = await OTP.findOne({email: email});
        if(!findOTP){
            return res.status(400).json({ message: 'OTP expired or not found' });
        }

        const ifOTPMatch = await bcrypt.compare(otp,findOTP.otp);
        if(!ifOTPMatch){
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        await OTP.deleteOne({email:email});

        const resetToken = jwt.sign({email, verify: true},process.env.JWT_SECRET);
        res.status(200).json({ message: 'OTP verified successfully!' ,resetToken});
    } catch (error) {
        res.status(500).json({ message: 'Invalid or expired token', error });
    }

}

module.exports = verifyOTP;