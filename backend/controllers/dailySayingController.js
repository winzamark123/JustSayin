const dailySayingModel = require('../models/dailySayingModel');
const sayingModel = require('../models/sayingModel');
const userModel = require('../models/userModel');
const moment = require('moment');
const sayingController = require('./sayingController');
const { response } = require('express');

exports.generateNewDailySaying = async (req, res) => {
    try {
        const uid = req.uid;
        const today = moment().format('YYYY-MM-DD');

        //new saying
        let randomSayingByCategories = await sayingController.getRandomSayingByCategoriesInternal(uid);
        let newDailySaying = new dailySayingModel({
            firebaseID: uid,
            sayingID: randomSayingByCategories,
            date: today,
            isSeen: true //default to true
        });
        console.log("THIS IS NEW DAILY SAYING", newDailySaying);

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
        });

        //if theres no saying for today, generate a new one
        if (!dailySaying) {
            return this.generateNewDailySaying(req, res);
        }

        //if the daily saying has already been seen, return it
        return res.status(200).json({ message: "Daily saying found", dailySaying });


    } catch (error) {
        console.error("Error occurred in getDailySaying BACKEND:", error);
        res.status(500).json({ message: "Error getting daily saying", error: error.message });
    }
}