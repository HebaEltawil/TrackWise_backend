require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/usersModel');
const saltRounds = 10;


const resetPass = async (req,res)=>{
    const {password, confirmPassword, token} = req.body;

    if(!password || !confirmPassword || !token){
        return res.json({ message: 'password, confirmPassword and token are required' });
    }

    if(password != confirmPassword){
        return res.json({message: 'Passwords do not match'});
    }

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password,salt);

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        const email = decodedToken.email;

        const user = await User.findOne({ email });
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });

    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
}

module.exports = resetPass;