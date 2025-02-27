const express = require('express');
const router = express.Router();
const editData = require('../controller/userController/editProfileData')
const sendRequest = require('../controller/userController/sendRequest')
const acceptRequest = require('../controller/userController/acceptRequest')
const rejectRequest = require('../controller/userController/rejectRequest')

router.put('/editProfileData',editData.editData);
router.post('/sendRequest',sendRequest.sendRequest);
router.post('/acceptRequest',acceptRequest.acceptRequest);
router.post('/rejectRequest',rejectRequest.rejectRequest);
module.exports = router;
