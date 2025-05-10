const Admin = require('../../model/adminModel');
const Tag = require('../../model/tagsModel');

const tagColors = ['#FF5722', '#2196F3', '#4CAF50', '#9C27B0', '#FFC107', '#795548'];
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const addTag = async (req,res) =>{
    const email = req.userEmail;
    const {label, icon} = req.body;
    const isAdmin = await Admin.findOne({email: email}); 
    if(!isAdmin){
        return res.status(400).json({ message: 'Invalid Admin' });
    }
    try {
        const color = getRandomElement(tagColors);
        const tag = new Tag({label, icon, color});
        await tag.save();
        res.status(200).json({ message: 'Tag added successfully', tag });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}

module.exports = addTag;