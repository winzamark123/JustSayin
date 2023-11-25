const express = require('express');
const { getRandomSaying, postSaying, getAllSayings, getSayingByID } = require('../controllers/sayingController');

const router = express.Router();

//GET all sayings
router.get('/', getAllSayings)


//GET random Saying
router.get('/random', getRandomSaying);

//GET saying by id
router.get('/:id', getSayingByID)

//POST a saying 
router.post('/', postSaying);

//DELETE a saying by id
router.delete('/:id', (req, res) => {
    res.send('Hello World! by sayings.js');
})

//UPDATE a saying by id
router.patch('/:id', (req, res) => {
    res.send('Hello World! by sayings.js');
})




module.exports = router;    