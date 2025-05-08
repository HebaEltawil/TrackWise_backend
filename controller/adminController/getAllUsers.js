const User = require('../../model/usersModel');
const Admin = require('../../model/adminModel');

const getAllUsers = async (req,res) =>{
    const email = req.userEmail;
    const isAdmin = await Admin.findOne({email: email}); 
    if(!isAdmin){
        return res.status(400).json({ message: 'Invalid Admin' });
    }
    try {
        const users = await User.find({}, { firstName: 1, lastName:1, email:1, phoneNumber:1});
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}

module.exports = getAllUsers;