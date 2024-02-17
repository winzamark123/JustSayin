const admin = require('firebase-admin');

exports.sendTestNotification = async (req, res) => {
    const { deviceToken } = req.body;
    console.log("Device Token: ", deviceToken);

    const message = {
        notification: {
            title: 'Test Notification',
            body: 'This is a test notification!'
        },
        token: deviceToken
    };    

    try{
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
        res.status(200).json({ message: "Test Notification Sent" });
    } catch (error) {
        console.log('Error sending message:', error);
        res.status(500).json({ message: "Error sending test notification" });
    }

}