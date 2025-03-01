const User= require('../../model/usersModel');


const removeFriend = async (req,res)=>{
    const userEmail = req.userEmail;
    const { friendEmail } = req.body;

    try {
        const user = await User.findOne({email: userEmail});
        const friend =await User.findOne({email: friendEmail});

        if (!user || !friend) {
            return res.status(400).json({ message: 'User or friend not found' });
        }

        user.friends = user.friends.filter(friendId => !friendId.equals(friend._id));
        friend.friends = friend.friends.filter(userId => !userId.equals(user._id));

        await user.save();
        await friend.save();

        res.status(200).json({ message: 'Friend removed successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

module.exports = removeFriend;