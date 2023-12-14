const sayingModel = require('../models/sayingModel');
const { getUserCategories } = require('./userController'); // import the function
const sayingModel = require('../models/sayingModel');



//GET all sayings
exports.getAllSayings = async (req, res) => {
    // const sayings = await sayingModel.find({}).sort({ createdAt: -1 });

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

        res.json(randomSaying);

    } catch (error) {
        res.status(500).send('Error occurred: ' + error.message);
    }
}

exports.getSayingByCategories = async (req, res) => {
    try {
        const uid = req.uid;
        // Use getUserCategories to get the user's saved category IDs
        const categoryIds = await getUserCategories(uid);
        // Find sayings that match the user's categories
        const matchingSayings = await sayingModel.find({ category: { $in: categoryIds } });

        // Handle no sayings found
        if (!matchingSayings.length) {
            return res.status(404).json({ message: "No sayings found for the selected categories" });
        }

        // Randomly select a saying
        const randomSaying = matchingSayings[Math.floor(Math.random() * matchingSayings.length)];

        // Send the saying as a response
        res.status(200).json(randomSaying);
    } catch (error) {
        console.error("Error occurred in getSayingByCategories:", error);
        res.status(500).json({ message: "Error getting saying by categories", error: error.message });
    }
}