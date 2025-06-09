const Admin = require('../../model/adminModel');
const Tag = require('../../model/tagsModel');

const allTags = async (req,res) =>{
    const email = req.userEmail;
    const isAdmin = await Admin.findOne({email: email}); 
    if(!isAdmin){
        return res.status(400).json({ message: 'Invalid Admin' });
    }
    try {
        const tags = await Tag.find();
        res.status(200).json({ tags });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}

module.exports = allTags;