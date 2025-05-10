const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    label:{type:String , required:true, unique:true },
    icon:{ type:String , required:true },
    color:{ type:String , required:true }
});

module.exports = mongoose.model('Tag', tagSchema);