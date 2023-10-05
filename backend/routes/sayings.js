const express = require('express');
const router = express.Router();

const { createSaying } = require('../controllers/sayingController');


//GET all sayings
router.get('/', (req, res) => {

})

//GET saying by id
router.get('/:id', (req, res) => {
    res.send('Hello World! sayings.js');
})

//POST a saying by id
router.post('/:id', async (req, res) => {
    try {
        const saying = await sayingModel.create(req.body);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//DELETE a saying by id
router.delete('/:id', (req, res) => {
    res.send('Hello World! by sayings.js');
})

//UPDATE a saying by id
router.patch('/:id', (req, res) => {
    res.send('Hello World! by sayings.js');
})



module.exports = router;    