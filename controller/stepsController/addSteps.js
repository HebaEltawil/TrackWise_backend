const User = require('../../model/usersModel');

const addSteps = async (req,res) => {
    const email = req.userEmail;
    try {
        const { date, steps } = req.body;

        if (!date || typeof steps !== 'number' || steps < 0) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // user.steps.set(date, (user.steps.get(date) || 0) + steps);
        user.steps.set(date, steps);
        await user.save();

        res.status(200).json({ message: "Steps added successfully", steps: user.steps });
    } catch (error) {
        console.error('Error in adding steps:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = addSteps;
