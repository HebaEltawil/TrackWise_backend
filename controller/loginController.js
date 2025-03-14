require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/usersModel');

const login = async (req,res) => {
    const {email, password}= req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber},
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

        res.json({ message: 'Login successful!', token, friends: user.friends, usage: user.usage, steps: user.steps});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
    
};

module.exports = login;