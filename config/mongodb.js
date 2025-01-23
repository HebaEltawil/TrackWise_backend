const mongoose = require('mongoose');

const connectDB = mongoose.connect('mongodb://127.0.0.1:27017/TrackWise')
.then(()=>{
    console.log('Mongodb connected');
})
.catch(()=>{
    console.log('Failed to connect to Mongodb');
});

module.exports = connectDB;



