require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../model/usersModel');
const saltRounds = 10;


const resetPass = async (req,res)=>{
    const {password, confirmPassword} = req.body;
    const email = req.userEmail; 
    const verify = req.verify; 

    if(!password || !confirmPassword ){
        return res.status(400).json({ message: 'password, confirmPassword and token are required' });
    }

    if(password != confirmPassword){
        return res.status(400).json({message: 'Passwords do not match'});
    }

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password,salt);
        if(!verify){
            return res.status(400).json({ message: 'OTP verification required' });
        }
        const user = await User.findOne({ email });
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

module.exports = resetPass;