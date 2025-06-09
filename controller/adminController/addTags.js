const Admin = require('../../model/adminModel');
const Tag = require('../../model/tagsModel');


const addTag = async (req,res) =>{
    const email = req.userEmail;
    const {name, image, steps} = req.body;
    const isAdmin = await Admin.findOne({email: email}); 
    if(!isAdmin){
        return res.status(400).json({ message: 'Invalid Admin' });
    }
    try {
        const tag = new Tag({name, image, steps});
        await tag.save();
        res.status(200).json({ message: 'Tag added successfully', tag });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}

module.exports = addTag;