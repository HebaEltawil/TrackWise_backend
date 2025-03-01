const User= require('../../model/usersModel');
const jwt = require('jsonwebtoken');

const getAllFriends = async (req,res)=>{
    const email = req.userEmail;

    try {
        const user = await User.findOne({email});
        const friendIds = user.friends;
        const friends = [];
        for(const friendId of friendIds){
            const friend = await User.findById(friendId,{firstName:1, lastName:1, email:1, phoneNumber:1});
            if(friend){
                friends.push(friend);
            }
        }
        res.status(200).json({friends});
    } catch (error){
        res.status(500).json({ message: 'Internal server error', error });
    }
}

module.exports = getAllFriends;