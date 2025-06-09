// const friendsTags = async (friends, date, allTags) =>{
//     const updatedFriends = await Promise.all(
//         friends.map( async friend => {
//         const friendSteps = friend.steps?.get(date) || 0;
//         const friendTag = allTags.filter(tag => friendSteps >= tag.steps).sort((a, b) => b.steps - a.steps)[0];
//         if (friendTag && friend.tags?.get(date)?.toString() !== friendTag._id.toString()) {
//                 friend.tags.set(date, friendTag._id);
//                 await friend.save();
//             }
//         return {
//             name : friend.firstName + " " + friend.lastName,
//             email: friend.email,
//             steps: friendSteps,
//             tag: friendTag ? {
//                 name: friendTag.name,
//                 image: friendTag.image,
//                 steps: friendTag.steps
//             } : null 
//         };
//     }));
//     return updatedFriends;
// };

// module.exports = friendsTags;