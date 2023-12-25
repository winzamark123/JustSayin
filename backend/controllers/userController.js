const userModel = require('../models/userModel');

exports.createUser = async (req, res) => {
    try {
        const uid = req.uid;
        const username = req.body.username;

        // Check if user already exists
        let user = await userModel.findOne({ firebaseID: uid });
        if (user) {
            return res.status(409).send('User already exists');
        }

        // Create new user
        user = new userModel({
            firebaseID: uid,
            username: username,
            categories: [],
            sayings: []
        });

        // Save user to database
        await user.save();

        res.status(201).json({ message: 'User Created Successfully!', user });
    } catch (error) {
        res.status(500).json({ message: "Error Creating User", error: error.message });
    }
}

exports.saveUserCategories = async (req, res) => {
    const { categories } = req.body; // Get the category IDs array from the request body
    const uid = req.uid;

    try {
        const user = await userModel.findOne({ firebaseID: uid }); // Find the user by userID

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.savedCategories = categories; // Assign the new categories to the user
        await user.save(); // Save the user with the updated categories

        res.status(200).json({ message: "Categories updated successfully", user });
    } catch (error) {
        console.error("Error occurred in saveUserCategories:", error);
        res.status(500).json({ message: "Error updating user categories", error: error.message });
    }
}

exports.saveUserSaying = async (req, res) => {
    const uid = req.uid;
    const { sayingID } = req.body;

    try {

        const user = await userModel.findOne({ firebaseID: uid }); // Find the user by userID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.savedSayings.push(sayingID);
        await user.save()// Add the new saying to the user

        res.status(201).json({ message: "Saying saved successfully", user });


    } catch (error) {
        console.error("Error occurred in saveUserSaying:", error);
        res.status(500).json({ message: "Error saving user saying", error: error.message });
    }
}

exports.getUserSayings = async (req, res) => {
    const uid = req.uid;

    try {
        const user = await userModel.findOne({ firebaseID: uid }).populate('savedSayings'); // Find the user by userID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user.savedSayings);

    } catch (error) {
        console.error("Error occurred in getUserSayings:", error);
        res.status(500).json({ message: "Error getting user sayings", error: error.message });
    }
}


exports.getUser = async (req, res) => {
    const uid = req.uid;
    const user = await userModel.findOne({ firebaseID: uid });
    try {
        if (!user) {
            return res.status(400).json({ message: err.message + "No User" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    return res.status(200).json(user);

}

// for getRandomSayingByCategories (Internal)
exports.getUserCategoriesInternal = async (uid) => {
    const user = await userModel.findOne({ firebaseID: uid }).populate('savedCategories');
    if (!user) {
        throw new Error("User not found");
    }
    return user.savedCategories.map(category => category.name);
};

//for Routes (for HTTP requests)
exports.getUserCategories = async (req, res) => {
    try {
        const uid = req.uid;

        // Find the user and populate savedCategories
        const user = await userModel.findOne({ firebaseID: uid }).populate('savedCategories');

        // If no user is found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with the user's saved categories
        res.status(200).json(user.savedCategories.map(category => category.name));
    } catch (error) {
        console.error("Error occurred in getUserCategories BACKEND:", error);
        res.status(500).json({ message: "Error getting user categories", error: error.message });
    }

}

