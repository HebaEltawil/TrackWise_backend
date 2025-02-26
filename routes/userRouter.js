const express = require('express');
const router = express.Router();
const addFriend = require('../controller/userController/addFriend');
const editData = require('../controller/userController/editProfileData')

router.post('/addFriend',addFriend.addFriend);
router.put('/editProfileData',editData.editData);

module.exports = router;
