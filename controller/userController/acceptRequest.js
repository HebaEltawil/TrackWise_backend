const User = require('../../model/usersModel');

const acceptRequest = async (req, res) =>{
    
    const { userEmail, senderEmail } = req.body;
    try {
        const user = await User.findOne({email: userEmail});
        const sender = await User.findOne({email: senderEmail});

        if(!user || !sender){
            return res.status(404).json({ message: 'User not found' });
        }

        if(!user.receivedRequests.includes(sender._id)){
            return res.status(404).json({ message: 'Request not found' });
        }

        user.receivedRequests = user.receivedRequests.filter(
            id => id.toString() !== sender._id.toString()
        );

        sender.sentRequests = sender.sentRequests.filter(
            id => id.toString() !== user._id.toString() 
        );

        user.friends.push(sender._id);
        sender.friends.push(user._id);
        
        await user.save();
        await sender.save();
        res.status(200).json({message: 'Request is accepted  successfully'})

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
    
}

module.exports={acceptRequest};