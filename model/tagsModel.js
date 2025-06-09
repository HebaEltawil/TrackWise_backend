const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name:{type:String , required:true, unique:true },
    image:{ type:String , required:true },
    steps:{ type:Number , required:true }
});

module.exports = mongoose.model('Tag', tagSchema);