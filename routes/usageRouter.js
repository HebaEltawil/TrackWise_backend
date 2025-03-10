const express = require('express');
const router = express.Router();
const extractFromToken = require('../middleware/authMiddleware');
const addUsage = require('../controller/usageController/addUsage');
const updateUsageForDate = require('../controller/usageController/updateUsageForDate');

router.post('/addUsage',extractFromToken,addUsage);
router.post('/updateUsage',extractFromToken,updateUsageForDate);

module.exports = router;