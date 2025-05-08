const express = require('express');
const router = express.Router();
const login = require('../controller/adminController/login');
const extractFromToken = require('../middleware/authMiddleware');
const createAdmin = require('../controller/adminController/createAdmin');
const logout = require('../controller/logoutController');
const getAllUsers = require('../controller/adminController/getAllUsers');
const deleteUser = require('../controller/adminController/deleteUser');

router.post('/login', login);
router.post('/logout', extractFromToken, logout);
router.post('/createAdmin', createAdmin);
router.get('/allUsers',extractFromToken, getAllUsers);
router.delete('/deleteUser',extractFromToken, deleteUser);
module.exports = router;