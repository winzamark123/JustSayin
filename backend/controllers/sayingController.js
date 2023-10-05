const sayingModel = require('../models/sayingModel');

//Create new Saying 
const createSaying = async (req, res) => {
    try {
        const saying = await sayingModel.create(req.body);
        res.status(200).json(saying);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


//GET all sayings
const getAllSayings = async (req, res) => {

}
//GET saying by id

//POST saying by id

//DELETE saying by id

module.exports = {
    createSaying
}