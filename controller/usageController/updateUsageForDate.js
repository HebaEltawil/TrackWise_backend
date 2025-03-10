const User = require('../../model/usersModel');

const updateUsageForDate = async (req,res)=>{
    const email = req.userEmail;
    const {date, usageData} = req.body;
    try {
        const user = await User.findOne(email);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        user.usage.set(date,usageData);
        await user.save();
        res.status(200).json({message: `Usage updated for ${date} successfully!`, user});
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
    
} 

module.exports = updateUsageForDate;