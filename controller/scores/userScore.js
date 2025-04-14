const User= require('../../model/usersModel');


const UserScore = (user, today) =>{
    try {
        let usageTimeSum = 0;
        if(user.usage && user.usage.get(today)){
                const todayUsage = user.usage.get(today);
                for(const app of todayUsage){
                    usageTimeSum += app.usageMinutes;
                }
                usageTimeSum = usageTimeSum/60;
            }
            const hour = Math.floor(usageTimeSum);
            const minutes = Math.ceil((usageTimeSum - hour) * 60);
            let steps = 0;
            if(user.steps && user.steps.get(today)){
                steps = user.steps.get(today);
            }
            const usageScore = Math.max((1-(usageTimeSum/12)),0);
            const stepsScore = Math.min(steps/12000,1);
            const totalScore = (usageScore * 70) + (stepsScore * 30);

        return {name : `${user.firstName} ${user.lastName}`,
            email: user.email,
            score:totalScore,
            steps: steps,
            usage: `${hour}hrs ${minutes}mins`
        };
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message});
    }

}

module.exports = UserScore;