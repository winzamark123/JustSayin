const express = require('express');
const { createUser, saveUserCategories, getUser } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/', verifyToken, createUser);
router.post('/:userID/categories', verifyToken, saveUserCategories);
router.get('/:userID', verifyToken, getUser);

module.exports = router;