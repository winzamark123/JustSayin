const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    firebaseID: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        required: false,
        default: "tempUser.png"
    },
    savedSayings: [{
        type: Schema.Types.ObjectId,
        ref: 'Saying'
    }],
    savedCategories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],




})


module.exports = mongoose.model('User', userSchema);