const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sayingSchema = new Schema({
    quote: {  // Changed from 'saying' to 'quote' to match your document structure
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    category: {  // Changed from 'categoryID' to 'category' and type from ObjectId to String
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Saying', sayingSchema, "collection2");
