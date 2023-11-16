const mongoose = require('mongoose');

const Schema = mongoose.Schema

const sayingSchema = new Schema({
    saying: {
        type: String,
        required: true,
        unique: true
    },

    author: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },



}, { timestamps: true })


module.exports = mongoose.model('Saying', sayingSchema);