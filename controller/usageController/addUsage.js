const User = require('../../model/usersModel');

const addUsage = async (req,res)=>{
    const email = req.userEmail;
    const {usage} = req.body;
    try {
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const usageMap = new Map(Object.entries(usage));
        for(const [date,usageData] of usageMap){
            user.usage.set(date,usageData);
        }
        await user.save();
        res.status(200).json({message: 'Usage added successfully!', usage: user.usage});
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
    
} 

module.exports = addUsage;