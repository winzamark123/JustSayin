const express = require('express');
const { getDailySaying, generateNewDailySaying } = require('../controllers/dailySayingController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:userID', verifyToken, getDailySaying);
router.get('/:userID/generate', verifyToken, generateNewDailySaying);

module.exports = router;