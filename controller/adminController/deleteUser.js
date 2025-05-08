const User = require('../../model/usersModel');
const Admin = require('../../model/adminModel');

const deleteUser = async (req,res) =>{
    const email = req.userEmail;
    const userEmail = req.body.email;
    if (!userEmail) {
        return res.status(400).json({ message: 'User email is required' });
    }
    const isAdmin = await Admin.findOne({email: email}); 
    if(!isAdmin){
        return res.status(400).json({ message: 'Invalid Admin' });
    }
    try {
        const deletedUser = await User.deleteOne({email: userEmail});
        if(deletedUser.deletedCount == 0){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({message: 'User deleted successfully!'});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}

module.exports = deleteUser;