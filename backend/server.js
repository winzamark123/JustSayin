const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');

const dailySayingController = require('./controllers/dailySayingController.js');
const notificationController = require('./controllers/notificationController.js');

const cron = require('node-cron');
const dotenv = require('dotenv');
dotenv.config();



admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_SERVICE_ACCOUNT_project_id,
        privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_private_key.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_client_email,

    }),
});
const app = express();

app.use(express.json());

// console.log("privateKEY:", process.env.FIREBASE_SERVICE_ACCOUNT_private_key);
// console.log("clientEmail:", process.env.FIREBASE_SERVICE_ACCOUNT_client_email);

//routes 
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/sayings', require('./routes/sayingRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/dailySayings', require('./routes/dailySayingRoutes'));


//connect to db (mongoose)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        // console.log('Connected to MongoDB');
        console.log('Connection successful to database:', mongoose.connection.db.databaseName);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
        dailySayingController.nodeGenerateForAllUsers();
        console.log("Running the daily saying generation task");

        // cron schedule ever minute
        // cron.schedule('* * * * *', async () => {
        //     console.log("Running the notification task")
        //     notificationController.sendNotificationToAllUsers();
        // });


        cron.schedule('0 0 * * *', async () => {
            console.log("Running the daily saying generation task");
            dailySayingController.nodeGenerateForAllUsers();
            notificationController.sendNotificationToAllUsers();
        });
    })
    .catch((err) => {
        console.log(err);
    })
