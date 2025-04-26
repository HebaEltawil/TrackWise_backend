const User = require('../../model/usersModel');

const getAllUsers = async (req,res) =>{
    try {
        const users = await User.find({}, { firstName: 1, lastName:1, email:1, steps:1, usage:1 });
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}

module.exports = getAllUsers;