const express = require('express');
const { createUser, saveUserCategories, getUser, getUserCategories, saveUserSaying, getUserSayings } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/', verifyToken, createUser);
router.post('/:userID/categories', verifyToken, saveUserCategories);
router.post('/:userID/savedSayings', verifyToken, saveUserSaying);
router.get('/:userID/savedSayings', verifyToken, getUserSayings);
router.get('/:userID', verifyToken, getUser);
router.get('/:userID/categories', verifyToken, getUserCategories);

module.exports = router;