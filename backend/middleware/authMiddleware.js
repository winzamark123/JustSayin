const admin = require('firebase-admin');

exports.verifyToken = async (req, res, next) => {
    // const token = req.headers.authorization?.split('Bearer ')[1];
    const token = req.headers.authorization?.split(' ')[1]; // Get the token from the Authorization header


    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        console.log("TOKEN: ", token);
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.uid = decodedToken.uid; // Add UID to the request object
        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

// module.exports = verifyToken;