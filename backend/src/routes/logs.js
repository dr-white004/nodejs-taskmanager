const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/activityLog');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, activityLogController.getActivityLogs);

module.exports = router;
