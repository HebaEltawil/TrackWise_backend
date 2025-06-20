const User= require('../../model/usersModel');
const userScore = require('./userScore');


const scores = async (req,res)=>{
    const userEmail = req.userEmail;
     const now = new Date();
        const today = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
    const date = req.body.date || today;
    try {
        const user = await User.findOne({email:userEmail}).populate('friends');
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const friendsScores = [];
        for(const friend of user.friends){
            let usageTimeSum = 0;
            if(friend.usage && friend.usage.get(date)){
                const UsageDate = friend.usage.get(date);
                for(const app of UsageDate){
                    usageTimeSum += app.usageMinutes;
                }
                usageTimeSum = usageTimeSum/60;

            }
            const hour = Math.floor(usageTimeSum);
            const minutes = Math.round((usageTimeSum - hour) * 60);
            const usageDouble = parseFloat(`${hour}.${minutes < 10 ? '0' : ''}${minutes}`);
            let steps = 0;
            if(friend.steps && friend.steps.get(date)){
                steps = friend.steps.get(date);
            }
            const usageScore = Math.max((1-(usageTimeSum/12)),0);
            const stepsScore = Math.min(steps/12000 ,1);
            const totalScore = (usageScore * 70) + (stepsScore * 30);
            friendsScores.push({
                name : friend.firstName + " " + friend.lastName,
                email: friend.email,
                score: totalScore,
                steps: steps,
                usage: usageDouble
            })
        }
        res.status(200).json({User:userScore(user,date),friendsScores});
    } catch (error) {
        res.status(500).json({ message: 'Invalid or expired token', error });
    }

}

module.exports = scores;