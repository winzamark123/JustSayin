const express = require('express');
const sayingsRouter = require('./routes/sayings');
const mongoose = require('mongoose');

require('dotenv').config();


const app = express();

app.use(express.json());

//routes 
app.use('/api/sayings', sayingsRouter)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & Server is running on port 4000!!!');
        })
    })
    .catch((err) => {
        console.log(err)
    })