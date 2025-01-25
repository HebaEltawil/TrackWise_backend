const User = require('../model/usersModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signup = async (req,res) => {
    const {firstName, lastName, email, password, confirmPassword, phoneNumber} = req.body;

    if(password != confirmPassword){
        return res.json({message: 'Passwords do not match'});
    }
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = new User({firstName,lastName,email,password:hashedPassword,phoneNumber});
        await user.save();
        res.json({message : 'User created successfully!'});
    }
    catch(err){
        if(await User.findOne({email})){
            return res.json({ message: 'Email already exists!' });
        }
        else{
            res.json({error: err.message});
        }
    }
    
    
}

module.exports = signup;