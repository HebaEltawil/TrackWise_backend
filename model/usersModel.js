const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{type:String , required:true},
    lastName:{type:String , required:true},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    phoneNumber:{type:String , required:true},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    receivedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    usage: {type:Map, of:mongoose.Schema.Types.Mixed, default:{}},
    steps: {type:Map, of:Number, default:{}},
    tags: { type: Map, of: mongoose.Schema.Types.ObjectId, ref: 'Tag', default: {} },
});

module.exports = mongoose.model('User', userSchema);