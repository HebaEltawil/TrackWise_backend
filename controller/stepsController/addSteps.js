const User = require('../../model/usersModel');

const addSteps = async (req,res) => {
    const email = req.userEmail;
    try {
        const { steps } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const stepsMap = new Map(Object.entries(steps));
        for(const [date,stepsData] of stepsMap){
            if (!date || typeof stepsData !== 'number' || stepsData < 0) {
                continue
            }else{
                user.steps.set(date,stepsData);
            }
        }
        await user.save();

        res.status(200).json({ message: "Steps added successfully", steps: user.steps });
    } catch (error) {
        console.error('Error in adding steps:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = addSteps;
