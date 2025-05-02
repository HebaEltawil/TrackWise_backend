const User = require('../../model/usersModel');

const editData = async (req,res) => {
    
    const userId = req.userId;
    const { firstName, lastName, phoneNumber } = req.body;
    try {

        let user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        if(firstName) user.firstName = firstName;
        if(lastName) user.lastName = lastName;
        if(phoneNumber) user.phoneNumber = phoneNumber;

        await user.save();

        res.status(200).json(
            { message: "Profile updated successfully", 
                user: {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber
                    } 
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {editData};