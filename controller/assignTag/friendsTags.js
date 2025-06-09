const friendsTags = async (friends, date, allTags) =>{
    const updatedFriends = await Promise.all(
        friends.map( async friend => {
        const friendSteps = friend.steps?.get(date) || 0;
        const friendTag = allTags.filter(tag => friendSteps >= tag.steps).sort((a, b) => b.steps - a.steps)[0];
        if (friendTag &&!friend.tags.map(tag => tag.toString()).includes(friendTag._id.toString())) {
                friend.tags.push(friendTag._id);
                await friend.save();
            }
        const updatedFriend = await friend.populate('tags');
        return {
            email: friend.email,
            friendsTags: updatedFriend.tags.map(tag => ({
                name: tag.name,
                image: tag.image,
                steps: tag.steps
            })) 
        };
    }));
    return updatedFriends;
};

module.exports = friendsTags;