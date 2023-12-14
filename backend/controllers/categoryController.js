const categoryModel = require('../models/categoryModel');
const userModel = require('../models/userModel');

const mongoose = require('mongoose');

exports.getAllCategories = async (req, res) => {
    const categories = await categoryModel.find({});
    try {
        if (!categories) {
            return res.status(400).json({ message: err.message + "No Categories" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    return res.status(200).json(categories);
}



