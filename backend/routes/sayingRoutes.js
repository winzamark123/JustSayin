const express = require('express');
const { getRandomSaying, postSaying, getAllSayings, getSayingByID } = require('../controllers/sayingController');

const router = express.Router();

//GET all sayings
router.get('/', getAllSayings)


//GET random Saying
router.get('/random', getRandomSaying);






module.exports = router;    