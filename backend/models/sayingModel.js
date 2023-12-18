const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sayingSchema = new Schema({
    quote: {  // This matches the 'quote' field in your documents
        type: String,
        required: true,
        unique: true
    },
    author: {  // This matches the 'author' field in your documents
        type: String,
        required: true
    },
    category: {  // This matches the 'category' field in your documents
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Saying', sayingSchema, "collection2");

//testing out wakatime 