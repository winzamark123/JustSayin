const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');

const sayingRouter = require('./routes/sayingRoutes.js');
const categoryRouter = require('./routes/categoryRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const dailySayingRouter = require('./routes/dailySayingRoutes.js');

const dailySayingController = require('./controllers/dailySayingController.js');
const { sendDailySayingNotification } = require('./notification.js');
const cron = require('node-cron');


admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_SERVICE_ACCOUNT_project_id,
        privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_private_key.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_client_email
    }),
});
const app = express();

app.use(express.json());

//routes 
app.use('/api/users', userRouter);
app.use('/api/sayings', sayingRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/dailySayings', dailySayingRouter);


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
        cron.schedule('* * * * *', async () => {
            sendDailySayingNotification();
        });


        cron.schedule('0 0 * * *', async () => {
            console.log("Running the daily saying generation task");
            dailySayingController.nodeGenerateForAllUsers();
        });
    })
    .catch((err) => {
        console.log(err);
    })