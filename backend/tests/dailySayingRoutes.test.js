const request = require('supertest');
const express = require('express');
const dailySayingRoutes = require('../routes/dailySayingRoutes');
const app = express();

app.use(express.json());
app.use('/api/dailySayings', dailySayingRoutes);

describe('GET /api/dailySayings', () => {
    it('responds with json', async () => {
        const res = await request(app)
            .get('/api/dailySayings')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        // Add more assertions about the response here if needed
    });
});