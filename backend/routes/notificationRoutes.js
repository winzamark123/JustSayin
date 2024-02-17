const express = require('express');
const { sendTestNotification } = require('../controllers/notificationController');

const router = express.Router();

router.post('/test', sendTestNotification);

// console.log("Notification Routes Loaded")

module.exports = router;