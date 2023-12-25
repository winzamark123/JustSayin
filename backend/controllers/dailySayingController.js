const dailySayingModel = require('../models/dailySayingModel');
const sayingModel = require('../models/sayingModel');
const userModel = require('../models/userModel');
const moment = require('moment');
const sayingController = require('./sayingController');
const { response } = require('express');

//Used for when user refreshes for a new saying
exports.generateNewDailySaying = async (req, res) => {
    try {
        const uid = req.uid;
        const today = moment().format('YYYY-MM-DD');

        //new saying
        let randomSayingByCategories = await sayingController.getRandomSayingByCategoriesInternal(uid);
        let newDailySaying = new dailySayingModel({
            firebaseID: uid,
            sayingID: randomSayingByCategories._id,
            date: today,
            isSeen: true //default to true
        });
        // console.log("THIS IS NEW DAILY SAYING", newDailySaying);

        await newDailySaying.populate('sayingID');
        await newDailySaying.save();

        return res.status(201).json(newDailySaying);

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
        }).sort({ _id: -1 }).limit(1); //sort from descending order and limit to 1 to GET LATEST 

        //if theres no saying for today, generate a new one
        if (!dailySaying) {
            return this.generateNewDailySaying(req, res);
        }

        //if the daily saying has already been seen, return it
        // console.log("THIS IS DAILY SAYING", dailySaying);
        await dailySaying.populate('sayingID');

        return res.status(200).json(dailySaying);


    } catch (error) {
        console.error("Error occurred in getDailySaying BACKEND:", error);
        res.status(500).json({ message: "Error getting daily saying", error: error.message });
    }
}

//FOR NODECRON
//=======================================================
//=======================================================
//=======================================================
exports.nodeGenerateForAllUsers = async () => {
    try {
        //get all users
        const users = await userModel.find();
        // console.log("THIS IS USERS", users);

        const promises = users.map(user => {
            return this.nodeGenerateNewDailySaying(user.firebaseID)
        });

        await Promise.all(promises);

    } catch (error) {
        console.error("Error occurred in generateForAllUsers BACKEND:", error);

    }
}

exports.nodeGenerateNewDailySaying = async (uid) => {
    try {
        // console.log("UserID", uid);
        const today = moment().format('YYYY-MM-DD');
        const existingSaying = await dailySayingModel.findOne({ firebaseID: uid, date: today });

        if (existingSaying) {
            return "Saying already exists for today";
        }


        //new saying
        let randomSayingByCategories = await sayingController.getRandomSayingByCategoriesInternal(uid);
        // console.log("THIS IS RANDOM SAYING BY CATEGORIES", randomSayingByCategories);
        let newDailySaying = new dailySayingModel({
            firebaseID: uid,
            sayingID: randomSayingByCategories._id,
            date: today,
            isSeen: true //default to true
        });
        // console.log("THIS IS NEW DAILY SAYING", newDailySaying);


        await newDailySaying.populate('sayingID');
        await newDailySaying.save();

        return newDailySaying;


    } catch (error) {
        console.error("Error occurred in nodeGenerateSaying BACKEND:", error);
    }
}
//=======================================================