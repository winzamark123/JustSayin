const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const admin = require('firebase-admin');

const BASE_URL = "http://localhost:4000";

exports.createUser = async (req, res) => {
    try {
        const { idToken } = req.body;
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

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
        res.status(500).json({ message: "Error Creating User", error });
    }
}



// exports.saveUser = async (user) => {
//     const idToken = await FIREBASE_AUTH.currentUser.getIdToken();

//     try {
//         const response = await axios.post(`${BASE_URL}/api/users`, {
//             user: user,
//             idToken: idToken
//         });
//         return response.data;
//     } catch (error) {
//         console.error(error)
//     }
// }