const request = require('supertest');
const express = require('express');
const sayingController = require('../controllers/sayingController');
const app = express();
require('dotenv').config({ path: "../.env.local" });

const mongoose = require('mongoose');


app.use(express.json());
app.get('/api/sayings/random', sayingController.getRandomSaying);
app.get('/api/sayings/', sayingController.getAllSayings);


//Connect to MONGODB
beforeAll(async () => {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000 // Optional: Increase timeout
    });
});

afterAll(async () => {
    await mongoose.disconnect();
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

        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body[0]).toHaveProperty('_id');
        expect(res.body[0]).toHaveProperty('quote');
        expect(res.body[0]).toHaveProperty('author');
        expect(res.body[0]).toHaveProperty('category');
    }, 10000);
});
