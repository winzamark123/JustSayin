module.exports = async () => {
    // Close the MongoDB connection
    await global.__MONGO_CONN__.close();
};