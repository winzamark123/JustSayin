const express = require('express');
const { createUser, saveUserCategories, getUser, getUserCategories, saveUserSaying, getUserSayings, editUsername, saveUserProfilePic } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const multer = require('multer');


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', verifyToken, createUser);
router.get('/:userID/savedSayings', verifyToken, getUserSayings);
router.get('/:userID', verifyToken, getUser);
router.get('/:userID/categories', verifyToken, getUserCategories);

router.post('/:userID/savedSayings', verifyToken, saveUserSaying);
router.post('/:userID/categories', verifyToken, saveUserCategories);
router.patch('/:userID/username', verifyToken, editUsername);

//can remove middleware for logging now 
router.post('/:userID/profilePic', verifyToken, upload.single('profilePic'), saveUserProfilePic);

module.exports = router;