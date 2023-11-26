const express = require('express');
const mongoose = require('mongoose');

const sayingRouter = require('./routes/sayingRoutes.js');
const categoryRouter = require('./routes/categoryRoutes.js');
// require('dotenv').config();
require('dotenv').config({ path: "../.env.local" });

const app = express();

app.use(express.json());

//routes 
app.use('/api/sayings', sayingRouter);
app.use('/api/categories', categoryRouter);

//connect to db (mongoose)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        // console.log('Connected to MongoDB');
        console.log('Connection successful to database:', mongoose.connection.db.databaseName);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err)
    })