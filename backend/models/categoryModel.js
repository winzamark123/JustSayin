const mongoose = require('mongoose');

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    // Other fields as needed...
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema, 'categories');