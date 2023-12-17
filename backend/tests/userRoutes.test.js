const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const userController = require('../controllers/userController');
const userModel = require('../models/userModel');
const categoryModel = require('../models/categoryModel');

const { MongoMemoryServer } = require('mongodb-memory-server');

require('dotenv').config({ path: "../.env.local" });


const app = express();
let mongoServer;
let userID;
let testUid = "defaultUid";


const mockAuthMiddleware = (req, res, next) => {
    req.uid = testUid;
    next();
}

const setTestUid = (uid) => {
    testUid = uid;
}

const mockCategories = [
    {
        name: 'Test Category 1',
    },
    {
        name: 'Test Category 2',
    },
    {
        name: 'Test Category 3',
    }
]
let mockUsers = [
    {
        firebaseID: 'firebaseUser1',
        username: 'TestUser1',
        savedSayings: [],
        savedCategories: [],
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
    //inserting mock categories and their IDs
    const insertedCategories = await categoryModel.insertMany(mockCategories);
    const categoryIds = insertedCategories.map((category) => category._id);

    // Update mock users with category IDs
    mockUsers = mockUsers.map(user => ({
        ...user,
        savedCategories: categoryIds
    }));

    //for more specific 
    // for (const user of mockUsers) {
    //     const newUser = new userModel(user);
    //     await newUser.save();
    // }
    await userModel.insertMany(mockUsers);
    // Repeat for other collections/models as necessary
};

app.use(express.json());
app.post('/api/users/', mockAuthMiddleware, userController.createUser);
app.post('/api/users/:userID/categories', mockAuthMiddleware, userController.saveUserCategories);
app.get('/api/users/:userID', mockAuthMiddleware, userController.getUser);
app.get('/api/users/:userID/categories', mockAuthMiddleware, userController.getUserCategories);


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

describe('Get User Routes', () => {
    test('should get user details', async () => {
        setTestUid('firebaseUser1');

        const createdUser = await userModel.findOne({ firebaseID: 'firebaseUser1' });

        if (!createdUser) {
            throw new Error('User not found');
        };
        userID = createdUser._id.toString();

        const res = await request(app)
            .get(`/api/users/${userID}`)
            .set('Authorization', `Bearer mock-token`)
            .set('Accept', 'application/json');

        if (res.statusCode !== 200) {
            console.error(res.text); // This should help identify what's going wrong
        }

        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-type']).toMatch(/json/);

        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('firebaseID', 'firebaseUser1');
        expect(res.body).toHaveProperty('username');
        expect(res.body.savedCategories).toBeInstanceOf(Array);
    }, 10000);

    test('should get user categories', async () => {
        setTestUid('firebaseUser1');

        const createdUser = await userModel.findOne({ firebaseID: 'firebaseUser1' });
        if (!createdUser) {
            throw new Error('User not found');
        }

        userID = createdUser._id.toString();
        const res = await request(app)
            .get(`/api/users/${userID}/categories`)
            .set('Authorization', `Bearer mock-token`)
            .set('Accept', 'application/json');

        if (res.statusCode !== 200) {
            console.error(res.text);
        }

        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toBeInstanceOf(Array);

        console.log("GET user categories:", res.body);
        // expect(res.body[0]).toHaveProperty();

    }, 10000);
});

// Test cases
describe('Post User Routes', () => {
    test('should create a new user', async () => {
        setTestUid('firebaseUser3');

        const res = await request(app)
            .post('/api/users/')
            .set('Authorization', `Bearer mock-token`)
            .send({
                firebaseID: 'firebaseUser3',
                username: 'TestUser3',
            });
        expect(res.statusCode).toEqual(201);


        const createdUser = await userModel.findOne({ firebaseID: 'firebaseUser3' });
        console.log("POST new User:", createdUser);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});