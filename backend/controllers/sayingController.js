const sayingModel = require('../models/sayingModel');
const { getUserCategories, getUserCategoriesInternal } = require('./userController'); // import the function

//GET all sayings
exports.getAllSayings = async (req, res) => {
    // const sayings = await sayingModel.find({}).sort({ createdAt: -1 });

    console.log("GET ALL SAYINGS HIT");
    const sayings = await sayingModel.find({});
    try {
        if (!sayings) {
            return res.status(400).json({ message: err.message + "No Sayings" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }


    res.status(200).json(sayings);


}

//GET random Saying
exports.getRandomSaying = async (req, res) => {
    const count = await sayingModel.countDocuments();
    if (count === 0) {
        return res.status(404).send({ error: 'No Counts at All' });
    }
    try {
        const count = await sayingModel.countDocuments();
        if (count === 0) {
            return res.status(404).send({ error: 'No sayings found' });
        }

        const random = Math.floor(Math.random() * count);
        const randomSaying = await sayingModel.findOne().skip(random);

        if (!randomSaying) {
            return res.status(404).send('No sayings found');
        }

        res.status(200).json(randomSaying);

    } catch (error) {
        res.status(500).send('Error occurred: ' + error.message);
    }
}

exports.getRandomSayingByCategoriesInternal = async (uid) => {
    try {
        const categoryNames = await getUserCategoriesInternal(uid);

        // Find sayings that match the user's categories
        let matchingSayings;
        if (categoryNames.length > 0) {
            matchingSayings = await sayingModel.find({ category: { $in: categoryNames } });
        } else {
            matchingSayings = await sayingModel.find({});
        }

        const randomIndex = Math.floor(Math.random() * matchingSayings.length);
        const randomSaying = matchingSayings[randomIndex];

        return randomSaying;
    } catch (error) {
        return error;
    }
}

exports.getRandomSayingByCategories = async (req, res) => {
    try {
        const uid = req.uid;
        // Use getUserCategories to get the user's saved category IDs
        const categoryNames = await getUserCategoriesInternal(uid);

        // Find sayings that match the user's categories
        let matchingSayings;
        if (categoryNames.length > 0) {
            matchingSayings = await sayingModel.find({ category: { $in: categoryNames } });
        } else {
            matchingSayings = await sayingModel.find({});
        }

        const randomIndex = Math.floor(Math.random() * matchingSayings.length);
        console.log("GET RandomSayingByCategories Controller: Matching Sayings:", matchingSayings);
        console.log("GET RandomSayingByCategories Controller: Random Index:", randomIndex);

        // Randomly select a saying
        const randomSaying = matchingSayings[randomIndex];

        // Send the saying as a response
        res.status(200).json(randomSaying);
    } catch (error) {
        console.error("Error occurred in getSayingByCategories:", error);
        res.status(500).json({ message: "Error getting saying by categories", error: error.message });
    }
}

