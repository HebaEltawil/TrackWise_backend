const User = require('../../model/usersModel');
const Tag = require('../../model/tagsModel');
const friendsTags = require('./friendsTags');

const tags = async (req, res) => {
    const userEmail = req.userEmail;
    const now = new Date();
    const date = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
    try {
        const user = await User.findOne({email: userEmail}).populate('friends');
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }
        const userSteps = user.steps.get(date) || 0;
        const allTags = await Tag.find();
        if(!allTags || allTags.length === 0){
            return res.status(404).json({message: 'Not Tags found'});
        }

        const assignedTag = allTags.filter(tag => userSteps >= tag.steps).sort((a, b) => b.steps - a.steps)[0];

        const friends = await friendsTags(user.friends, date, allTags);
        if(!assignedTag){
            return res.status(200).json({message: 'User has not achieved the required number of steps for any tag', friends});
        }
        if(!user.tags.map(tag => tag.toString()).includes(assignedTag._id.toString())){
                user.tags.push(assignedTag._id);
                await user.save();
        }
        const updatedUser = await User.findById(user._id).populate('tags');
        return res.status(200).json({message: 'Get user and friends Tags successfully', tags: updatedUser.tags, friends});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}

module.exports = tags;