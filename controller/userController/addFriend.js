const User = require('../../model/usersModel');

const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: "User is already your friend" });
        }
        
        user.friends.push(friendId); 
        friend.friends.push(userId);

        await user.save();
        await friend.save();
        res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};




module.exports = {addFriend};
