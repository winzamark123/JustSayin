const express = require('express');
const router = express.Router();

const { postSaying, getAllSayings, getSayingByID } = require('../controllers/sayingController');


//GET all sayings
router.get('/', getAllSayings)

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