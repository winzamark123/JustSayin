const userModel = require('../models/userModel');
const mongoose = require('mongoose');

const BASE_URL = "http://localhost:4000";

exports.saveUserToMongoDB = async (req, res) => {
}



exports.saveUser = async (user) => {
    const idToken = await FIREBASE_AUTH.currentUser.getIdToken();

    try {
        const response = await axios.post(`${BASE_URL}/api/users`, {
            user: user,
            idToken: idToken
        });
        return response.data;
    } catch (error) {
        console.error(error)
    }
}