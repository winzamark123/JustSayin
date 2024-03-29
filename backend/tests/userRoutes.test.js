const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const userController = require('../controllers/userController');
const sayingController = require('../controllers/sayingController');
const sayingModel = require('../models/sayingModel');
const userModel = require('../models/userModel');
const categoryModel = require('../models/categoryModel');

const { MongoMemoryServer } = require('mongodb-memory-server');
const AWSMock = require('aws-sdk-mock');


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
        name: 'Test1',
    },
    {
        name: 'Test2',
    },
    {
        name: 'Test3',
    },
    {
        name: 'TestA',
    },
    {
        name: 'TestB',
    },
    {
        name: 'TestC',
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

let mockSayings = [
    {
        quote: "Test1 Quote 1",
        author: "Test1 Author 1",
        category: "Test1"
    },
    {
        quote: "Test2 Quote 2",
        author: "Test2 Author 2",
        category: "Test2"
    },
    {
        quote: "Test3 Quote 3",
        author: "Test3 Author 3",
        category: "Test3"
    }
]

const insertMockData = async () => {
    //inserting mock categories and their IDs
    const insertedCategories = await categoryModel.insertMany(mockCategories);

    // Filter for specific categories (Test1, Test2, Test3)
    const filteredCategoryIds = insertedCategories
        .filter(category => ['Test1', 'Test2', 'Test3'].includes(category.name))
        .map(category => category._id);

    // Update mock users with category IDs
    mockUsers = mockUsers.map(user => ({
        ...user,
        savedCategories: filteredCategoryIds
    }));

    //for more specific 
    // for (const user of mockUsers) {
    //     const newUser = new userModel(user);
    //     await newUser.save();
    // }
    await userModel.insertMany(mockUsers);
    await sayingModel.insertMany(mockSayings);
    // Repeat for other collections/models as necessary
};

app.use(express.json());
app.post('/api/users/', mockAuthMiddleware, userController.createUser);
app.post('/api/users/:userID/categories', mockAuthMiddleware, userController.saveUserCategories);
app.post('/api/users/:userID/savedSayings', mockAuthMiddleware, userController.saveUserSaying);
app.get('/api/users/:userID', mockAuthMiddleware, userController.getUser);
app.get('/api/users/:userID/categories', mockAuthMiddleware, userController.getUserCategories);
app.get('/api/users/:userID/savedSayings', mockAuthMiddleware, userController.getUserSayings);

app.get('/api/sayings/:userID', mockAuthMiddleware, sayingController.getRandomSayingByCategories);

app.patch('/api/users/:userID/username', mockAuthMiddleware, userController.editUsername);

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

        // console.log("GET user categories:", res.body);
        // expect(res.body[0]).toHaveProperty();

    }, 10000);

    test('should get user sayings', async () => {
        setTestUid('firebaseUser1');

        const createdUser = await userModel.findOne({ firebaseID: 'firebaseUser1' });
        if (!createdUser) {
            throw new Error('User not found');
        }

        userID = createdUser._id.toString();
        const res = await request(app)
            .get(`/api/users/${userID}/savedSayings`)
            .set('Authorization', `Bearer mock-token`)
            .set('Accept', 'application/json');

        console.log("GET user sayings:", res.body);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);

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


        // const createdUser = await userModel.findOne({ firebaseID: 'firebaseUser3' });
        // console.log("POST new User:", createdUser);
    });
    test('should save user categories', async () => {
        setTestUid('firebaseUser1');
        const createdUser = await userModel.findOne({ firebaseID: 'firebaseUser1' });
        if (!createdUser) {
            return res.status(404).json({ message: "User not found" });
        }

        userID = createdUser._id;

        testCategoryA = await categoryModel.findOne({ name: 'TestA' });
        testCategoryB = await categoryModel.findOne({ name: 'TestB' });

        const res = await request(app)
            .post(`/api/users/${userID}/categories`)
            .set('Authorization', `Bearer mock-token`)
            .send({
                categories: [testCategoryA._id, testCategoryB._id]
            });

        // console.log("POST user categories:", res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Categories updated successfully');

        expect(res.body.user.savedCategories).toBeInstanceOf(Array);
        expect(res.body.user.savedCategories).toHaveLength(2);

    });
    test('should save user saying', async () => {
        setTestUid('firebaseUser1');
        const createdUser = await userModel.findOne({ firebaseID: 'firebaseUser1' });
        if (!createdUser) {
            return res.status(404).json({ message: "User not found" });
        }

        userID = createdUser._id;

        const testSaying = await sayingModel.findOne({ quote: 'Test1 Quote 1' });
        // console.log("SDAASD", testSaying);

        const res = await request(app)
            .post(`/api/users/${userID}/savedSayings`)
            .set('Authorization', `Bearer mock-token`)
            .send({
                sayingID: testSaying._id,
            });

        // console.log("POST user saying:", res.body);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Saying saved successfully');
        expect(res.body.user.savedSayings).toBeInstanceOf(Array);

    });
});

describe('Patch User Routes', () => {
    test('should edit user username', async () => {
        setTestUid('firebaseUser1');
        const createdUser = await userModel.findOne({ firebaseID: 'firebaseUser1' });
        if (!createdUser) {
            return res.status(404).json({ message: "User not found" });
        }

        userID = createdUser._id;

        const res = await request(app)
            .patch(`/api/users/${userID}/username`)
            .set('Authorization', `Bearer mock-token`)
            .send({
                username: 'TestUser1Edited'
            });

        // console.log("PATCH user username:", res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Username updated successfully');

        expect(res.body.user.username).toEqual('TestUser1Edited');
        console.log("PATCH user username:", res.body.user.username);
    });
});

describe('Custom Handling for No Categories User', () => {
    let createdUserId;
    test('should create a new user with no categories', async () => {
        setTestUid('firebaseUser4');

        const response = await request(app)
            .post('/api/users/')
            .set('Authorization', `Bearer mock-token`)
            .send({
                firebaseID: 'firebaseUser4',
                username: 'TestUser4',
            });
        expect(response.statusCode).toEqual(201);

        // Save the created user ID for use in the next test
        createdUserId = response.body.user._id;
    });

    test('should retrieve Nothing for user categories', async () => {
        // Make sure createdUserId is defined
        if (!createdUserId) {
            throw new Error("User ID not found");
        }

        const response = await request(app)
            .get(`/api/users/${createdUserId}/categories`)
            .set('Authorization', `Bearer mock-token`);
        expect(response.statusCode).toEqual(200);

        const testUserCategories = response.body;
        expect(testUserCategories).toHaveLength(0);
        console.log("TEST USER CATEGORIES", testUserCategories);
    });
    test('should get a random saying with regardless of category', async () => {
        const res = await request(app)
            .get(`/api/sayings/${createdUserId}`)
            .set('Authorization', `Bearer mock-token`)
        expect(res.statusCode).toEqual(200);

        console.log("RANDOM SAYING", res.body);
    })
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});