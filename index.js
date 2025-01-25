const express = require('express');
const connectDB = require('./config/mongodb');
const loginSignUpRouter = require('./routes/login_signupRouter');
const cors = require('cors');
const port = 3000;


//connect to database
connectDB;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api',loginSignUpRouter);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});