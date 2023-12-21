const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const dailySayingController = require('../controllers/dailySayingController');
const sayingModel = require('../models/sayingModel');
const userModel = require('../models/userModel');
const categoryModel = require('../models/categoryModel');

const { MongoMemoryServer } = require('mongodb-memory-server');
const dailySayingModel = require('../models/dailySayingModel');
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
        quote: "Test2 Quote  1",
        author: "Test2 Author 1",
        category: "Test Category 1"
    },
    {
        quote: "Test2 Quote 2",
        author: "Test2 Author 2",
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
app.get('/api/dailySayings/:userID/generate', mockAuthMiddleware, dailySayingController.generateNewDailySaying);

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

describe('Get DailySaying Routes', () => {
    test('should generate a new daily saying', async () => {
        setTestUid("firebaseUser1");

        const createdUser = await userModel.findOne({ firebaseID: 'firebaseUser1' });
        if (!createdUser) {
            return res.status(404).json({ message: "User not found" });
        }

        userID = createdUser._id;

        const res = await request(app)
            .get(`/api/dailySayings/${userID}/generate`)
            .set('Authorization', 'Bearer mock-token')
            .set('Accept', 'application/json')
            .expect(201);

        expect(res.body).toHaveProperty('firebaseID');
        expect(res.body).toHaveProperty('sayingID');
        expect(res.body).toHaveProperty('date');
        expect(res.body).toHaveProperty('isSeen');
    }, 10000);

})

describe('Internal Node Cron Job', () => {
    test('should generate daily sayings for all users', async () => {
    
        await dailySayingController.nodeGenerateForAllUsers();

        // Verify that a new daily saying has been generated for each mock user
        const updatedUser1 = await dailySayingModel.findOne({ firebaseID: 'firebaseUser1' });
        const updatedUser2 = await dailySayingModel.findOne({ firebaseID: 'firebaseUser2' });

        console.log("THIS IS UPDATED USER1", updatedUser1);
        console.log("THIS IS UPDATED USER2", updatedUser2);

        expect(updatedUser1).not.toBeNull();
        expect(updatedUser2).not.toBeNull();

        console.log("Updated user 1 dailySaying:", updatedUser1.sayingID);
        console.log("Updated user 2 dailySaying:", updatedUser2.sayingID);
    }, 10000);
});


afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
