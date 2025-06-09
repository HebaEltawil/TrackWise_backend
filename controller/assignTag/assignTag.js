// const User = require('../../model/usersModel');
// const Tag = require('../../model/tagsModel');
// const friendsTags = require('./friendsTags');

// const assignTag = async (req, res) => {
//     const userEmail = req.userEmail;
//     let {date} = req.body;
//     if(!date){
//         const now = new Date();
//         date = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
//     }
//     try {
//         const user = await User.findOne({email: userEmail}).populate('friends');
//         if(!user){
//             return res.status(400).json({message: 'User not found'});
//         }
//         const userSteps = user.steps.get(date) || 0;
//         const allTags = await Tag.find();
//         if(!allTags || allTags.length === 0){
//             return res.status(404).json({message: 'Not Tags found'});
//         }

//         const assignedTag = allTags.filter(tag => userSteps >= tag.steps).sort((a, b) => b.steps - a.steps)[0];

//         const friends = await friendsTags(user.friends, date, allTags);
//         if(!assignedTag){
//             return res.status(200).json({message: 'User has not achieved the required number of steps for any tag',
//                 user: {
//                     name: user.firstName + " " + user.lastName,
//                     email: user.email,
//                     steps: userSteps,
//                     tag: null
//                 },
//                 friends});
//         }
//         let hasTag =false;
//         const existingTagId = user.tags?.get(date);
//         if(existingTagId && existingTagId.toString() !== assignedTag._id.toString()){
//             user.tags.set(date, assignedTag._id);
//             await user.save();
//             hasTag =true
//         }
        
//         return res.status(200).json({message: hasTag ? 'Tag assigned successfully' : 'Tag already assigned',
//                 user: {
//                     name: user.firstName + " " + user.lastName,
//                     email: user.email,
//                     steps: userSteps,
//                     tag: {
//                     name: assignedTag.name,
//                     image: assignedTag.image,
//                     steps: assignedTag.steps
//                 }} ,
//                 friends});
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }

// }

// module.exports = assignTag;