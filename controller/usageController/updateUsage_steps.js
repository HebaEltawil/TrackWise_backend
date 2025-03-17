const User = require('../../model/usersModel');

const UpdateUsageAndSteps = async (req,res)=>{
    const email = req.userEmail;
    const {usage, steps} = req.body;
    try {
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const usageMap = new Map(Object.entries(usage));
        for(const [date,usageData] of usageMap){
            user.usage.set(date,usageData);
        }

        const stepsMap = new Map(Object.entries(steps));
        for(const [date,stepsData] of stepsMap){
            user.steps.set(date,stepsData);
        }

        await user.save();
        res.status(200).json({message: 'Usage and Steps updated successfully', usage: user.usage, steps: user.steps});
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
    
} 

module.exports = UpdateUsageAndSteps;