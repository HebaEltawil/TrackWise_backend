const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Mongodb connected');
})
.catch(()=>{
    console.log('Failed to connect to Mongodb');
});

module.exports = connectDB;



