const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const multer = require('multer');


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', verifyToken, userController.createUser);
router.get('/:userID/savedSayings', verifyToken, userController.getUserSayings);
router.get('/:userID', verifyToken, userController.getUser);

router.get('/:userID/categories', verifyToken, userController.getUserCategories);
router.post('/:userID/categories', verifyToken, userController.saveUserCategories);

router.post('/:userID/savedSayings', verifyToken, userController.saveUserSaying);
router.patch('/:userID/username', verifyToken, userController.editUsername);


//user Profiles
router.post('/:userID/profilePic', verifyToken, upload.single('profilePic'), userController.saveUserProfilePic);
router.get('/:userID/profilePic', userController.getUserProfilePic)

//user Friends
router.post('/:userID/friends', verifyToken, userController.addFriend);
router.get('/:userID/friends/dailySaying', verifyToken, userController.getFriendsDailySaying);

router.delete('/:userID/', verifyToken, userController.deleteUser);
module.exports = router;