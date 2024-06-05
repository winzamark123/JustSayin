const admin = require('firebase-admin');
const userModel = require('../models/userModel');
const dailySayingModel = require('../models/dailySayingModel');
const moment = require('moment');

exports.sendNotificationTest = async () => {
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
            // console.log(`No daily saying available for user ${user.firebaseID}`);
            continue; // Skip this iteration
        }

        // Prepare and send a notification for each device token
        deviceTokens.forEach(async (token) => {
            const message = {
                notification: {
                    title: 'Daily JustSayin',
                    body: "Test Test Test",
                },
                token: token,
                data: {
                    dailySaying: "Init Test Test Test",
                    author: "Ween Cheng",
                },
                apns: {
                    payload: {
                        aps: {
                            alert: {
                                title: 'Daily JustSayin',
                                body: "Test Test Test",
                            },
                            // 'mutable_content': true,
                            'content-available': true, // Important for iOS background notification
                            'mutable-content': true, // Important for iOS background notification
                        },
                    },
                    headers: {
                        'apns-priority': '5', // Use priority 5 for background notifications
                    },
                },
            };

            try {
                const response = await admin.messaging().send(message)
                // console.log('Successfully sent message:', response);
            } catch (error) {
                // console.log('Error sending message to user:', user.firebaseID, error);
            }
        });
    }
};

exports.sendHiNotificationToAllUsers = async () => {
    deviceTokens.forEach(async (token) => {
        const message = {
            notification: {
                title: 'Daily JustSayin',
                body: `Halo! Server Crashed XD BUT WE BACK`
            },
            token: token,
            data: {
                dailySaying: dailySaying.sayingID.quote ?? "Unknown",
                author: dailySaying.sayingID.author ?? "Author",
            },
            apns: {
                payload: {
                    aps: {
                        'content-available': 1, // Important for iOS background notification
                        'mutable-content': 1, // Important for iOS background notification
                    },
                },
                headers: {
                    'apns-priority': '5', // Use priority 5 for background notifications
                },
            },
        };

        try {
            const response = await admin.messaging().send(message)
            // console.log('Successfully sent message:', response);
        } catch (error) {
            // console.log('Error sending message to user:', user.firebaseID, error);
        }
    });
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
            // console.log(`No daily saying available for user ${user.firebaseID}`);
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
                data: {
                    dailySaying: dailySaying.sayingID.quote ?? "Unknown",
                    author: dailySaying.sayingID.author ?? "Author",
                },
                apns: {
                    payload: {
                        aps: {
                            'content-available': 1, // Important for iOS background notification
                            'mutable-content': 1, // Important for iOS background notification
                        },
                    },
                    headers: {
                        'apns-priority': '5', // Use priority 5 for background notifications
                    },
                },
            };

            try {
                const response = await admin.messaging().send(message)
                // console.log('Successfully sent message:', response);
            } catch (error) {
                // console.log('Error sending message to user:', user.firebaseID, error);
            }
        });
    }
};