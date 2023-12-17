const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const sayingController = require('../controllers/sayingController');
const sayingModel = require('../models/sayingModel');
const userModel = require('../models/userModel');
const categoryModel = require('../models/categoryModel');

const { MongoMemoryServer } = require('mongodb-memory-server');

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

const mockSayings = [
    {
        quote: "Test Quote 1",
        author: "Test Author 1",
        category: "Test Category 1"
    },
    {
        quote: "Test Quote 2",
        author: "Test Author 2",
        category: "Test Category 2"
    },
    {
        quote: "Test Quote 3",
        author: "Test Author 3",
        category: "Test Category 3"
    }
]


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
]

const insertMockData = async () => {
    const insertedCategories = await categoryModel.insertMany(mockCategories);
    const categoryIds = insertedCategories.map((category) => category._id);

    mockUsers = mockUsers.map(user => ({
        ...user,
        savedCategories: categoryIds
    }));

    await userModel.insertMany(mockUsers);
    await sayingModel.insertMany(mockSayings);

    // Repeat for other collections/models as necessary
}


app.use(express.json());
app.get('/api/sayings/random', sayingController.getRandomSaying);
app.get('/api/sayings/', sayingController.getAllSayings);
app.get('/api/sayings/:userID', mockAuthMiddleware, sayingController.getRandomSayingByCategories);


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

    await insertMockData();

});

describe('Get Saying Routes', () => {
    test('should get a random saying', async () => {
        const res = await request(app)
            .get('/api/sayings/random')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('quote');
        expect(res.body).toHaveProperty('author');
        expect(res.body).toHaveProperty('category');
    }, 10000);

    test('should get all sayings', async () => {
        const res = await request(app)
            .get('/api/sayings/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        console.log("GET all sayings:", res.body);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body[0]).toHaveProperty('_id');
        expect(res.body[0]).toHaveProperty('quote');
        expect(res.body[0]).toHaveProperty('author');
        expect(res.body[0]).toHaveProperty('category');
    }, 10000);

    test('should get sayings based on categories', async () => {
        setTestUid('firebaseUser1');

        const createdUser = await userModel.findOne({ firebaseID: 'firebaseUser1' });

        if (!createdUser) {
            console.error("Users in DB:", await userModel.find({})); // This should help identify what's going wrong
            throw new Error('User not found');
        };
        userID = createdUser._id.toString();

        const res = await request(app)
            .get(`/api/sayings/${userID}`)
            .set('Authorization', `Bearer mock-token`)
            .set('Accept', 'application/json');

        if (res.statusCode !== 200) {
            console.error(res.text); // This should help identify what's going wrong
        }

        console.log("GET sayings by categories:", res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('quote');
        expect(res.body).toHaveProperty('author');
        expect(res.body).toHaveProperty('category');


    }, 10000);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
