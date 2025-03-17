const express = require('express');
const router = express.Router();
const extractFromToken = require('../middleware/authMiddleware');
const addUsage = require('../controller/usageController/addUsage');
const updateUsageForDate = require('../controller/usageController/updateUsageForDate');
const updateUsageAndSteps = require('../controller/usageController/updateUsage_steps')

router.post('/addUsage',extractFromToken,addUsage);
router.post('/updateUsage',extractFromToken,updateUsageForDate);
router.post('/updateUsage-Steps',extractFromToken,updateUsageAndSteps)

module.exports = router;