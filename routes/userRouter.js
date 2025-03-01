const express = require('express');
const router = express.Router();
const extractFromToken = require('../middleware/authMiddleware');
const editData = require('../controller/userController/editProfileData');
const sendRequest = require('../controller/userController/sendRequest');
const acceptRequest = require('../controller/userController/acceptRequest');
const rejectRequest = require('../controller/userController/rejectRequest');
const getAllFriends = require('../controller/userController/allFriendsController');
const getAllRequests = require('../controller/userController/allRequestsController');
const removeFriend = require('../controller/userController/removeFriendController');
const findUserByEmail = require('../controller/userController/findUserController')

router.put('/editProfileData', extractFromToken, editData.editData);
router.post('/sendRequest',extractFromToken, sendRequest.sendRequest);
router.post('/acceptRequest',extractFromToken, acceptRequest.acceptRequest);
router.post('/rejectRequest',extractFromToken, rejectRequest.rejectRequest);
router.get('/getAllFriends',extractFromToken,getAllFriends);
router.get('/getAllRequests',extractFromToken,getAllRequests);
router.post('/unfriend',extractFromToken,removeFriend);
router.post('/findUserByEmail',findUserByEmail)
module.exports = router;
