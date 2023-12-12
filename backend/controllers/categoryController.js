const categoryModel = require('../models/categoryModel');
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

// exports.saveUserCategories = async (categories) => {
//     const idToken = await FIREBASE_AUTH.currentUser.getIdToken();

//     try {
//         const response = await axios.post(`${BASE_URL}/api/categories`, {
//             categories: categories,
//             idToken: idToken
//         });
//         return response.data;
//     } catch (error) {
//         console.error(error)
//     }

// }

