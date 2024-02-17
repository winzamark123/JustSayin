const admin = require('firebase-admin');
const User = require('./models/userModel');
//sending the daily saying to the user


exports.sendDailySayingNotification = async () => {
    // Get all users
    const users = await User.find({});
    // Filter out any users without a valid firebaseToken
    // const tokens = users.map(user => user.deviceTokens).filter(token => token);

    // Flatten the array of arrays and filter out null or undefined tokens
    const tokens = users.reduce((acc, user) => {
        const userTokens = user.deviceTokens.filter(token => token); // Assuming deviceTokens is an array
        return acc.concat(userTokens);
    }, []).filter(Boolean); // This removes any falsy values including '', null, undefined

    console.log("Tokens: ", tokens);

    if (tokens.length > 0) {
        const message = {
            notification: {
                title: 'Daily Saying',
                body: 'Check out your daily saying!'
            },
            tokens: tokens, // This should be an array of valid tokens
            
        };

        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            console.log('Successfully sent message:', response);
        } catch (error) {
            console.log('Error sending message:', error);
        }
    } else {
        console.log('No valid tokens to send notifications.');
    }
}