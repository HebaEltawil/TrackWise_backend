const User = require('../../model/usersModel');
const axios = require('axios');

const recommendApps = async (req,res) => {

    const email = req.userEmail;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const today = new Date();
        const formatted = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

        const usageList = user.usage.get(formatted);
        const packageNames = usageList.sort((a, b) => b.usageMinutes - a.usageMinutes).slice(0, 5).map(app => app.packageName);
        console.log(packageNames)
          const response = await axios.post('http://127.0.0.1:9000/recommend_by_packages', {
            package_names: packageNames
        });

        const neighborsInfo = response.data.neighbors_info;
        console.log(neighborsInfo);
        if (!neighborsInfo || neighborsInfo.length === 0) {
            return res.status(404).json({ error: 'No recommended app found' });
        }

        res.status(200).json({ recommended_app: neighborsInfo[0] });

        
    } catch (error) {
        console.error('Error in adding steps:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = recommendApps;
