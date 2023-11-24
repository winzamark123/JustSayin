const sayingModel = require('../models/sayingModel');
const mongoose = require('mongoose');

//Create new Saying 
const postSaying = async (req, res) => {
    try {
        const saying = await sayingModel.create(req.body);
        res.status(200).json(saying);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//GET all sayings
const getAllSayings = async (req, res) => {
    const sayings = await sayingModel.find({}).sort({ createdAt: -1 });
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
    try {
        const count = await sayingModel.countDocuments();
        const random = Math.floor(Math.random() * count);
        const saying = await sayingModel.findOne().skip(random);
        res.send(saying);
    } catch (error) {
        res.status(500).send('Error occurred: ' + error.message);
    }
}

//GET saying by id
const getSayingByID = async (req, res) => {


    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'inValidID' });
    }

    try {
        const saying = await sayingModel.findById(id);

        if (!saying) {
            return res.status(400).json({ message: err.message + "No such Sayin" })
        }

        res.status(200).json(saying);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }



}

//DELETE saying by id
const deleteSaying = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'inValidID' });
    }

    const saying = await Workout.findOneAndDelete({ _id: id });

    if (!saying) {
        return res.status(400).json({ message: 'No saying with that id' });
    }

    res.status(200).json({ message: 'Saying deleted successfully' });
}



module.exports = {
    getRandomSaying,
    postSaying,
    getAllSayings,
    getSayingByID
}