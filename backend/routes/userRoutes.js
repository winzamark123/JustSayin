const express = require('express');
const { createUser, saveUserCategories } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/', verifyToken, createUser);
router.post('/:userID/categories', verifyToken, saveUserCategories);

module.exports = router;