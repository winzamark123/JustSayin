const dailySayingModel = require('../models/dailySayingModel');
const sayingModel = require('../models/sayingModel');
const userModel = require('../models/userModel');
const moment = require('moment');

exports.generateNewDailySaying = async (req, res) => {
    try {
        const uid = req.uid;
        const today = moment().format('YYYY-MM-DD');

        //check if theres already a daily saying for today
        let dailySaying = await dailySayingModel.findOne({
            firebaseID: uid,
            date: today
        });

        if (dailySaying) {
            return res.status(409).json({ message: "Daily saying already exists for today" });
        }

        dailySaying = new dailySayingModel({
            firebaseID: uid,
            date: today,
            isSeen: false
        });



    } catch (error) {
        console.error("Error occurred in generateNewDailySaying BACKEND:", error);
        res.status(500).json({ message: "Error generating new daily saying", error: error.message });

    }
}
exports.getDailySaying = async (req, res) => {
    try {
        const uid = req.uid;
        const today = moment().format('YYYY-MM-DD');

        // Find the daily saying for this user for today
        const dailySaying = await dailySayingModel.findOne({
            firebaseID: uid,
            date: today
        });

        if (!dailySaying) {
            return res.status(404).json({ message: "Daily saying not found" });
        }

        return res.status(200).json({ message: "Daily saying found", dailySaying });


    } catch (error) {
        console.error("Error occurred in getDailySaying BACKEND:", error);
        res.status(500).json({ message: "Error getting daily saying", error: error.message });
    }
}