const User = require('../model/usersModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signup = async (req,res) => {
    const {firstName, lastName, email, password, confirmPassword, phoneNumber} = req.body;

    if(password != confirmPassword){
        return res.status(400).json({message: 'Passwords do not match'});
    }
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = new User({firstName,lastName,email,password:hashedPassword,phoneNumber});
        await user.save();
        res.status(200).json({message : 'User created successfully!'});
    }
    catch(error){
        if(await User.findOne({email})){
            return res.status(400).json({ message: 'Email already exists!' });
        }
        else{
            res.status(500).json({ message: 'Something went wrong', error });
        }
    }
    
    
}

module.exports = signup;