const express = require('express');
const connectDB = require('./config/mongodb');
const loginSignUpRouter = require('./routes/login_signupRouter');
const forgetPassRouter = require('./routes/forgetPassRouter');
const userRouter = require('./routes/userRouter');
const usageRouter = require('./routes/usageRouter');
const stepsRouter = require('./routes/stepsRouter');
const adminRouter = require('./routes/adminRouter');
const recommendationRouter = require('./routes/recommendation_router');
const cors = require('cors');
const port = 3000;

// Connect to database
connectDB;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', loginSignUpRouter);
app.use('/api', forgetPassRouter);
app.use('/api', userRouter);
app.use('/api', usageRouter);
app.use('/api', stepsRouter);
app.use('/api/admin',adminRouter);
app.use('/api/rec',recommendationRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});