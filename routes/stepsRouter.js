const express = require('express');
const router = express.Router();
const extractFromToken = require('../middleware/authMiddleware');
const addrequest =require('../controller/userController/sendRequest')
const addSteps = require('../controller/stepsController/addSteps'); 
const updateSteps = require('../controller/stepsController/updateSteps'); 

router.post('/addSteps', extractFromToken, addSteps);
router.post('/updateSteps', extractFromToken, updateSteps);

module.exports = router;
