const User = require('../../model/usersModel');


const sendRequest = async (req, res) => {
    const senderEmail = req.userEmail;
    const { receiverEmail } = req.body;

    try {
        const sender = await User.findOne({email: senderEmail});
        const receiver = await User.findOne({email: receiverEmail});

        if (!sender || !receiver) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (sender.sentRequests.includes(receiver._id)) {
            return res.status(400).json({ message: 'Friend request already sent' });
            
        }

        if(sender.receivedRequests.includes(receiver._id)){
            return res.status(400).json({ message: 'This user already sent you a request' });
        }
        
        if(sender.friends.includes(receiver._id)){
            return res.status(400).json({ message: 'You are already friends !' });
        }

        sender.sentRequests.push(receiver._id);
        receiver.receivedRequests.push(sender._id);
        
        await sender.save();
        await receiver.save();

        res.status(200).json({ message: 'Friend request sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {sendRequest};