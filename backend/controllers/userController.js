const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const admin = require('firebase-admin');

const BASE_URL = "http://localhost:4000";

exports.createUser = async (req, res) => {
    try {
        const uid = req.uid;
        // const decodedToken = await admin.auth().verifyIdToken(idToken);
        // const uid = decodedToken.uid;



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


