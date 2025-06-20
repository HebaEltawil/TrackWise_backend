const User= require('../../model/usersModel');

const findUserByEmail = async (req,res)=>{
    const userEmail = req.userEmail;
    const {email} = req.body;
    if(!email){
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const currentUser = await User.findOne({email: userEmail}).select('friends');
        const excludedUserIds = currentUser.friends.map(friendId => friendId.toString());
        const user = await User.find({ 
            $and: [
                { email: { $regex: email, $options: 'i' } },
                { email: { $ne: userEmail } },
                { _id: { $nin: excludedUserIds } }
            ]
        },
        {firstName:1, lastName:1, email:1, phoneNumber:1}).lean();
        if (!user || user.length === 0) {
            return res.status(404).json({ message: 'User not found or already friends' });
        }
        res.status(200).json({user});
    } catch (error) {

        res.status(500).json({ message: 'Internal server error', error });
    }
}
module.exports = findUserByEmail;
