const userModel = require('../models/userModel');
const dailySayingModel = require('../models/dailySayingModel');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config({ path: "../.env.local" });

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

exports.editUsername = async (req, res) => {
    // console.log("Edit Username Request Body:", req.body);
    try {
        const uid = req.uid;

        const user = await userModel.findOne({ firebaseID: uid });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.username = req.body.username;
        await user.save();


        res.status(200).json({ message: "Username updated successfully", user });
    } catch (error) {
        console.error("Error occurred in editUsername:", error);
        res.status(500).json({ message: "Error updating username", error: error.message });
    }
}

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    }
});

const AWSsaveUserProfilePic = async (req) => {
    const uid = req.uid;
    const uniqueFileName = `${uid}_${req.file.originalname}`;
    const params = {
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);

    try {
        await s3.send(command);
        // console.log("AWS SUCCESSFUL");
        return uniqueFileName;
    } catch (error) {
        console.error("Error occurred in AWSsaveUserProfilePic:", error);
        return "Error saving user profile picture";
    }
}

exports.saveUserProfilePic = async (req, res) => {
    const uid = req.uid;


    try {

        const AWSFileName = await AWSsaveUserProfilePic(req);
        // console.log("AWSFileName: ", AWSFileName);
        const user = await userModel.findOne({ firebaseID: uid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profilePic = AWSFileName;
        await user.save();

        // console.log("Profile Pic Saved to Backend");
        res.status(201).json({ message: "Profile picture saved successfully" });

    } catch (error) {
        console.error("Error occurred in saveUserProfilePic:", error);
        res.status(500).json({ message: "Error saving user profile picture", error: error.message });
    }
}

exports.getUserProfilePic = async (req, res) => {
    const uid = req.params.userID;

    try {
        const user = await userModel.findOne({ firebaseID: uid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const command = new GetObjectCommand({ Bucket: bucketName, Key: user.profilePic });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        // console.log("Profile Pic URL Generated", url);
        return res.status(200).json({ message: "Profile Pic URL Generated", url: url });
    } catch (error) {
        console.error("Error occurred in getUserProfilePic:", error);
        res.status(500).json({ message: "Error getting user profile picture", error: error.message });
    }
}

exports.addFriend = async (req, res) => {
    const uid = req.uid;
    const friendUsername = req.body.friendUsername;

    // console.log("Response", res.body);
    // console.log("Friend Username:", friendUsername);
    try {
        const user = await userModel.findOne({ firebaseID: uid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const friend = await userModel.findOne({ username: friendUsername });
        if (!friend) {
            return res.status(404).json({ message: "Friend not found" });
        } else if (user.friends.includes(friend._id)) {
            return res.status(409).json({ message: "Friend already added" });
        }

        user.friends.push(friend._id);
        await user.save();
        // console.log("Friend added successfully");
        return res.status(200).json({ message: "Friend added successfully" });

    } catch (error) {
        console.error("Error occurred in addFriend:", error);
        res.status(500).json({ message: "Error adding friend", error: error.message });
    }
}

exports.getFriendsDailySaying = async (req, res) => {
    const uid = req.uid;

    try {
        const user = await userModel.findOne({ firebaseID: uid }).populate('friends');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const friendsSayingsPromises = user.friends.map(async (friend) => {
            // Find the latest daily saying for each friend
            const latestDailySaying = await dailySayingModel.findOne({ firebaseID: friend.firebaseID })
                .sort({ date: -1 }) // Sort by date descending (latest first)
                .populate({
                    path: 'sayingID',
                    select: 'quote author'
                }) // Assuming you want to get the details of the saying
                .limit(1); // Limit to 1 result (latest)

            return {
                ...friend._doc,
                dailySaying: latestDailySaying ? latestDailySaying.sayingID : null
            };
        });


        const friendsSayings = await Promise.all(friendsSayingsPromises);
        // console.log("Friends Sayings:", friendsSayings);
        res.status(200).json(friendsSayings);

    } catch (error) {
        console.error("Error occurred in getFriendsDailySaying:", error);
        res.status(500).json({ message: "Error getting friend's daily saying", error: error.message });
    }
}

exports.getFriends = async (req, res) => {
    const uid = req.uid;
    try {
        const user = await userModel.findOne({ firebaseID: uid }).populate({
            path: 'friends',
            select: 'username profilePic' // Select only the username and profilePic fields
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create an array to hold the promises for getting profile picture URLs
        const profilePicPromises = user.friends.map(async (friend) => {
            const command = new GetObjectCommand({ Bucket: bucketName, Key: friend.profilePic });
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            return {
                username: friend.username, // Include the friend's username
                profilePicUrl: url // Include the signed URL for the profile picture
            };
        });

        // Resolve all the promises to get the profile picture URLs
        const friendsWithProfilePics = await Promise.all(profilePicPromises);

        res.status(200).json(friendsWithProfilePics);
    } catch (error) {
        console.error("Error occurred in getFriends:", error);
        res.status(500).json({ message: "Error getting user friends", error: error.message });
    }
}


exports.deleteUser = async (req, res) => {
    const uid = req.uid;
    console.log("UID:", uid)
    try {
        const user = await userModel.findOneAndRemove({ firebaseID: uid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove this user's ObjectId from the friends array of other users
        await userModel.updateMany(
            { friends: user._id },
            { $pull: { friends: user._id } }
        );

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error occurred in deleteUser:", error);
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
}

exports.deleteFriend = async (req, res) => {
    const uid = req.uid;
    const friendUsername = req.params.friendUsername;

    try {
        const user = await userModel.findOne({ firebaseID: uid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the friend's user document by username
        const friend = await userModel.findOne({ username: friendUsername });
        if (!friend) {
            return res.status(404).json({ message: "Friend not found" });
        }
        // Remove the friend's ID from the user's friends array
        user.friends = user.friends.filter(friendId => !friendId.equals(friend._id));
        await user.save();

        res.status(200).json({ message: "Friend deleted successfully" });
    } catch (error) {
        console.error("Error occurred in deleteFriend:", error);
        res.status(500).json({ message: "Error deleting friend", error: error.message });
    }
}

exports.addDeviceToken = async (req, res) => {
    const uid = req.uid;
    const { deviceToken } = req.body;

    try {
        const user = await userModel.findOne({ firebaseID: uid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.deviceTokens.push(deviceToken);

        //check if deviceToken already exists
        if (user.deviceTokens.includes(deviceToken)) {
            return res.status(200).json({ message: "Device token already exists" });
        }

        await user.save();
        return res.status(200).json({ message: "Device token added successfully" });

    } catch (error) {
        console.error("Error occurred in addDeviceToken:", error);
        res.status(500).json({ message: "Error adding device token", error: error.message });
    }
}

