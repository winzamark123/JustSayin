const express = require('express');
const { saveUserToMongoDB } = require('../controllers/userController');


const router = express.Router();

router.get('/', saveUserToMongoDB);

module.exports = router;