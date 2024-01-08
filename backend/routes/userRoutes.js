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

router.post('/:userID/profilePic', upload.single('profilePic'), (req, res, next) => {
    console.log("Request Body: ", req.body);
    console.log("Request File: ", req.file);
    next();
}, saveUserProfilePic);

module.exports = router;