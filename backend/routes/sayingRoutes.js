const express = require('express');
const { getRandomSaying, getAllSayings, getRandomSayingByCategories, testNotification} = require('../controllers/sayingController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();
//GET all sayings
router.get('/', getAllSayings)

//GET random Saying
router.get('/random', getRandomSaying);

//GET randomSaying by Categories
router.get('/:userID', verifyToken, getRandomSayingByCategories);

router.post('/test', (req, res, next) => {
    console.log("Sending Test Notification");
    const { deviceToken } = req.body;
    console.log("Device Token: ", deviceToken);
    next();
}, testNotification);

module.exports = router;    