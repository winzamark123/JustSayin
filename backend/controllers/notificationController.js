const admin = require('firebase-admin');
const userModel = require('../models/userModel');
const dailySayingModel = require('../models/dailySayingModel');
const moment = require('moment');

exports.sendNotificationTest = async (deviceToken) => {
    console.log("Sending Notification");
    const message = {
        notification: {
            title: "Daily Saying",
            body: "SOMETHIGN BRO CMONG"
        },
        token: deviceToken
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
        return { message: "Notification Sent" };
    } catch (error) {
        console.log('Error sending message:', error);
        return { message: "Error sending notification" };
    }
}


exports.sendNotificationToAllUsers = async () => {
    const today = moment().format('YYYY-MM-DD');
    const users = await userModel.find({}); // Assuming you have a User model

    for (const user of users) {
        // Assuming the User model includes a reference or method to get device tokens
        const deviceTokens = user.deviceTokens || []; // Adjust according to your model

        const dailySaying = await dailySayingModel.findOne({
            firebaseID: user.firebaseID, // Adjust if necessary to match your user identification logic
            date: today
        }).populate('sayingID').sort({ _id: -1 }).limit(1);

        if (!dailySaying) {
            // Logic to handle if no daily saying is available
            console.log(`No daily saying available for user ${user.firebaseID}`);
            continue; // Skip this iteration
        }

        // Prepare and send a notification for each device token
        deviceTokens.forEach(async (token) => {
            const message = {
                notification: {
                    title: 'Daily JustSayin',
                    body: `"${dailySaying.sayingID.quote}" - ${dailySaying.sayingID.author}`
                },
                token: token,
            };

            try {
                const response = await admin.messaging().send(message);
                console.log('Successfully sent message:', response);
            } catch (error) {
                console.log('Error sending message to user:', user.firebaseID, error);
            }
        });
    }
};