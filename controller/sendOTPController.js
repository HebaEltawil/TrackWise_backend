require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const OTP = require('../model/otpModel');
const User = require('../model/usersModel');

const saltRounds = 10;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        type: 'OAuth2',
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
});

const sendOTP = async (req,res) => {
    const {email} = req.body;
    
    if(!email){
        return res.json({message: 'Email is required'});
    }
    const user = await User.findOne({email});

    if(!user){
        return res.json({message: 'Invalid email'});
    }

    
    const otp = (Math.floor(Math.random()*1000)+1000).toString();

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedOTP = await bcrypt.hash(otp,salt);
        const otpSaved = new OTP({email,otp:hashedOTP});
        await otpSaved.save();
        const token = jwt.sign({email}, process.env.JWT_SECRET);
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Passwored Reset OTP',
            text: `Your OTP for password reset is ${otp}`
        };
        transporter.sendMail(mailOptions, (err,info)=>{
            if(err){
                return res.status(500).json({message: 'Failed to send OTP',err})
            }
            res.status(200).json({message: 'OTP sent to your email successfully!',token});
        })
    } catch (error) {
        res.json({message: 'Something went wrong',error});
    }
    
}

module.exports = sendOTP;