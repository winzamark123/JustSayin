const mongoose = require('mongoose');
// require('dotenv').config();
require('dotenv').config({ path: "../../.env.local" });

module.exports = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGO_URI is not defined in the environment.');
    }
    // Connect to MongoDB
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    // Set a global variable if needed, e.g., to store a reference to the database connection
    global.__MONGO_CONN__ = mongoose.connection;
};
