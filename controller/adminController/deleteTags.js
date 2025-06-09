const Admin = require('../../model/adminModel');
const Tag = require('../../model/tagsModel');

const deleteTag = async (req,res) =>{
    const email = req.userEmail;
    const {tagId} = req.body;
    if (!tagId) {
        return res.status(400).json({ message: 'Tag ID is required' });
    }
    const isAdmin = await Admin.findOne({email: email}); 
    if(!isAdmin){
        return res.status(400).json({ message: 'Invalid Admin' });
    }
    try {
        const deletedTag = await Tag.deleteOne({_id: tagId});
        if(deletedTag.deletedCount == 0){
            return res.status(404).json({ message: 'Tag not found' });
        }
        res.status(200).json({message: 'Tag deleted successfully!'});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}

module.exports = deleteTag;