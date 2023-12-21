const express = require('express');
const { getRandomSaying, getAllSayings, getRandomSayingByCategories } = require('../controllers/sayingController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

//GET all sayings
router.get('/', getAllSayings)

//GET random Saying
router.get('/random', getRandomSaying);

//GET randomSaying by Categories
router.get('/:userID', verifyToken, getRandomSayingByCategories);




module.exports = router;    