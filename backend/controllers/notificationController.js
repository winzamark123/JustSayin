const admin = require('firebase-admin');

exports.sendTestNotification = async (req, res) => {
    console.log("Sending Test Notification")
    const { deviceToken } = req.body;
    console.log("Device Token: ", deviceToken);

    const message = {
        notification: {
            title: 'Test Notification',
            body: 'This is a test notification!'
        },
        token: deviceToken
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
        res.status(200).json({ message: "Test Notification Sent" });
    } catch (error) {
        console.log('Error sending message:', error);
        res.status(500).json({ message: "Error sending test notification" });
    }

}

exports.sendNotification = async () => {
    console.log("Sending Notification")
    const message = {
        notification: {
            title: "Daily Saying",
            body: "SOMETHIGN BRO CMONG"
        },
        token: "e6-mMmr1rExsrPQ3reXyXp:APA91bFK5Nk705Zj4MtHj9GmGP1xRYHkAuxM9MVuoL99EprIfp_PTyNVg_ucHBZr5CC_P7QrTAj8gVVawPyY7U-C1cbLNcBDBNMK31yrFVSLpirod_DXBysPODLKN31pPB1ma2CV71aH"
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