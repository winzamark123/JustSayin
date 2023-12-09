const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const admin = require('firebase-admin');

const BASE_URL = "http://localhost:4000";

exports.createUser = async (req, res) => {
    try {
        const uid = req.uid;

        // Check if user already exists
        let user = await userModel.findOne({ firebaseID: uid });
        if (user) {
            return res.status(409).send('User already exists');
        }

        // Create new user
        user = new userModel({
            firebaseID: uid,
            categories: [],
            sayings: []
        });

        // Save user to database
        await user.save();

        res.status(201).json({ message: 'User Created Successfully!', user });
    } catch (error) {
        res.status(500).json({ message: "Error Creating User", error: error.message });
    }
}

exports.saveUserCategories = async (req, res) => {
    const { categories } = req.body; // Get the category IDs array from the request body
    const uid = req.uid;

    try {
        const user = await userModel.findOne({ firebaseID: uid }); // Find the user by userID

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.savedCategories = categories; // Assign the new categories to the user
        await user.save(); // Save the user with the updated categories

        res.status(200).json({ message: "Categories updated successfully", user });
    } catch (error) {
        console.error("Error occurred in saveUserCategories:", error);
        res.status(500).json({ message: "Error updating user categories", error: error.message });
    }
}


