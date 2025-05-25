const express = require('express');
const router = express.Router();
const extractFromToken = require('../middleware/authMiddleware');
const recommendApps = require('../controller/recommendationController/rec_controller');

router.get('/appRec',extractFromToken,recommendApps);

module.exports = router;