const express = require('express');
const router = express.Router();
const extractEmailFromToken = require('../middleware/authMiddleware');
const editData = require('../controller/userController/editProfileData');
const sendRequest = require('../controller/userController/sendRequest');
const acceptRequest = require('../controller/userController/acceptRequest');
const rejectRequest = require('../controller/userController/rejectRequest');

router.put('/editProfileData', extractEmailFromToken, editData.editData);
router.post('/sendRequest',extractEmailFromToken, sendRequest.sendRequest);
router.post('/acceptRequest',extractEmailFromToken, acceptRequest.acceptRequest);
router.post('/rejectRequest',extractEmailFromToken, rejectRequest.rejectRequest);
module.exports = router;
