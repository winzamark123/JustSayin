const categoryModel = require('../models/categoryModel');
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

exports.getAllCategories = async (req, res) => {
    const categories = await categoryModel.find({});
    try {
        if (!categories) {
            return res.status(400).json({ message: err.message + "No Categories" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.status(200).json(categories);
}


