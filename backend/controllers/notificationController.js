const admin = require('firebase-admin');

exports.sendNotificationToAllUsers = async () => {
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