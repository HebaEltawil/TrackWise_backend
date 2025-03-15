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

        const requestIds = user.receivedRequests;
        const requests = [];
        for(const requestId of requestIds){
            const request = await User.findById(requestId,{firstName:1, lastName:1, email:1, phoneNumber:1});
            if(request){
                requests.push(request);
            }
        }

        const friendIds = user.friends;
        const friends = [];
        for(const friendId of friendIds){
            const friend = await User.findById(friendId,{firstName:1, lastName:1, email:1, phoneNumber:1});
            if(friend){
                friends.push(friend);
            }
        }
        
        res.json({ message: 'Login successful!', token, friends: friends, usage: user.usage, steps: user.steps, requests: requests});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
    
};

module.exports = login;