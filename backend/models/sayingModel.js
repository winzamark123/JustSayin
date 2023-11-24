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

    categoryID: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },



}, { timestamps: true })


module.exports = mongoose.model('Saying', sayingSchema, "collection2");