const express = require('express');
const { getDailySaying } = require('../controllers/dailySayingController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getDailySaying);

module.exports = router;