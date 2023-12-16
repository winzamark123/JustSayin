const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const sayingController = require('../controllers/sayingController');
const sayingModel = require('../models/sayingModel');

const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
let mongoServer;

app.use(express.json());
app.get('/api/sayings/random', sayingController.getRandomSaying);
app.get('/api/sayings/', sayingController.getAllSayings);


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

const insertMockData = async () => {
    for (const saying of mockSayings) {
        const newSaying = new sayingModel(saying);
        await newSaying.save();
    }
    // Repeat for other collections/models as necessary
}

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

        console.log(res.body);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body[0]).toHaveProperty('_id');
        expect(res.body[0]).toHaveProperty('quote');
        expect(res.body[0]).toHaveProperty('author');
        expect(res.body[0]).toHaveProperty('category');
    }, 10000);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
