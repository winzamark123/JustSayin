const request = require('supertest');
const express = require('express');
require('dotenv').config({ path: "../.env.local" });

const userController = require('../controllers/userController');
const userModel = require('../models/userModel');

const app = express();

const mongoose = require('mongoose');


app.use(express.json());

const mockAuthMiddleware = (req, res, next) => {
    req.uid = "test-user-id";
    next();
}

app.post('/user', mockAuthMiddleware, userController.createUser);
app.put('/user/categories', mockAuthMiddleware, userController.saveUserCategories);
app.get('/user', mockAuthMiddleware, userController.getUser);



//Connect to MONGODB
beforeAll(async () => {
    // Connect to MongoDB Atlas
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000 // Optional: Increase timeout
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});

