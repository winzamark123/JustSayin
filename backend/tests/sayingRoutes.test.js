const request = require('supertest');
const express = require('express');
const sayingController = require('../controllers/sayingController');
const app = express();
require('dotenv').config({ path: "../.env.local" });

const mongoose = require('mongoose');


app.use(express.json());
app.use('/api/sayings/random', sayingController.getRandomSaying);
app.use('/api/sayings/', sayingController.getAllSayings);

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

//Get Random Saying
describe('GET /api/sayings/random', () => {
    it('responds with json', async () => {
        const res = await request(app)
            .get('/api/sayings/random')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('quote');
        expect(res.body).toHaveProperty('author');
        expect(res.body).toHaveProperty('category');

        // Add more assertions about the response here if needed
    }, 10000);
});

//Get All Sayings
describe('GET /api/sayings/', () => {
    it('responds with json', async () => {
        const res = await request(app)
            .get('/api/sayings/random')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('quote');
        expect(res.body).toHaveProperty('author');
        expect(res.body).toHaveProperty('category');

        // Add more assertions about the response here if needed
    }, 10000);
});