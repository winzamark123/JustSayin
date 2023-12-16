const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const userController = require('../controllers/userController');
const userModel = require('../models/userModel');
const userRoutes = require('../routes/userRoutes');

const { MongoMemoryServer } = require('mongodb-memory-server');

require('dotenv').config({ path: "../.env.local" });


const app = express();
let mongoServer;


app.use(express.json());

const mockAuthMiddleware = (req, res, next) => {
    req.uid = "firebaseUser1";
    next();
}

app.use('/api/users', mockAuthMiddleware, userRoutes);

const mockUsers = [
    {
        firebaseID: 'firebaseUser1',
        username: 'TestUser1',
        savedSayings: [],
        savedCategories: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
        friends: []
    },
    {
        firebaseID: 'firebaseUser2',
        username: 'TestUser2',
        savedSayings: [],
        savedCategories: [],
        friends: []
    },
    // ...additional mock users
];

const insertMockData = async () => {
    for (const user of mockUsers) {
        const newUser = new userModel(user);
        await newUser.save();
    }
    // Repeat for other collections/models as necessary
};

//Connect to MONGODB
beforeAll(async () => {
    // Connect to MongoDB Atlas
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000 // Optional: Increase timeout
    });

    //inserting MockData
    await insertMockData();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});



describe('Get User Routes', () => {
    test('should get user details', async () => {
        const res = await request(app)
            .get(`/api/users/${userID}`)
            .set('Accept', 'application/json');

        if (res.statusCode !== 200) {
            console.error(res.text); // This should help identify what's going wrong
        }

        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-type']).toMatch(/json/);

        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('firebaseID', userID);
        expect(res.body).toHaveProperty('username');
        expect(res.body.savedCategories).toBeInstanceOf(Array);
    }, 10000);
});

// Test cases
describe('Post User Routes', () => {
    test('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users/')
            .send({
                firebaseID: 'firebaseUser3',
                username: 'TestUser3',
                savedSayings: [],
                savedCategories: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
            });
        expect(res.statusCode).toEqual(201);
    });
});