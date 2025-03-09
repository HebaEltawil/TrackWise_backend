const express = require('express');
const router = express.Router();
const extractFromToken = require('../middleware/authMiddleware');
const addUsage = require('../controller/usageController/addUsage');
const updateUsage = require('../controller/usageController/updateUsage');
const updateUsageWithDate = require('../controller/usageController/updateUsagewithDate');

router.post('/addUsage',extractFromToken,addUsage);
router.post('/updateUsage',extractFromToken,updateUsage);
router.post('/updateUsageWithDate',extractFromToken,updateUsageWithDate);

module.exports = router;