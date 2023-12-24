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
    },
    savedSayings: [
        {
            sayingID: {
                type: Schema.Types.ObjectId,
                ref: 'Saying'
            },
            quote: {
                type: String,
                required: true,
            },
            author: {
                type: String,
                required: true,
            },
        }
    ],
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