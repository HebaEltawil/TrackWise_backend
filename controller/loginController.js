require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/usersModel');

const details = async (ids = []) =>{
    const results = await Promise.all(ids.map( id => User.findById(id, {firstName:1, lastName:1, email:1, phoneNumber:1} )));
    return results.filter(Boolean);
}

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
            { expiresIn: '2y' }
        );

        const [requests , friends] = await Promise.all([
            details(user.receivedRequests),
            details(user.friends)
        ])
        
        res.json({ message: 'Login successful!', token, friends, usage: user.usage, steps: user.steps, requests});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
    
};

module.exports = login;