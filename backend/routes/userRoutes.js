const express = require('express');
const { createUser, saveUserCategories, getUser, getUserCategories, saveUserSaying, getUserSayings, editUsername } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/', verifyToken, createUser);
router.get('/:userID/savedSayings', verifyToken, getUserSayings);
router.get('/:userID', verifyToken, getUser);
router.get('/:userID/categories', verifyToken, getUserCategories);

router.post('/:userID/savedSayings', verifyToken, saveUserSaying);
router.post('/:userID/categories', verifyToken, saveUserCategories);
router.patch('/:userID/username', verifyToken, editUsername);

module.exports = router;