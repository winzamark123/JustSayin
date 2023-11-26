const sayingModel = require('../models/sayingModel');
const mongoose = require('mongoose');


//GET all sayings
const getAllSayings = async (req, res) => {
    // const sayings = await sayingModel.find({}).sort({ createdAt: -1 });

    const sayings = await sayingModel.find({});
    try {
        if (!sayings) {
            return res.status(400).json({ message: err.message + "No Sayings" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }


    res.status(200).json(sayings);


}

//GET random Saying
const getRandomSaying = async (req, res) => {
    const count = await sayingModel.countDocuments();
    if (count === 0) {
        return res.status(404).send({ error: 'No Counts at All' });
    }
    try {
        const count = await sayingModel.countDocuments();
        if (count === 0) {
            return res.status(404).send({ error: 'No sayings found' });
        }

        const random = Math.floor(Math.random() * count);
        const randomSaying = await sayingModel.findOne().skip(random);

        if (!randomSaying) {
            return res.status(404).send('No sayings found');
        }

        res.json(randomSaying);

    } catch (error) {
        res.status(500).send('Error occurred: ' + error.message);
    }
}





module.exports = {
    getRandomSaying,
    getAllSayings,
}