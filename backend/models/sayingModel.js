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

    source : {
        type: String,
        required: true,
        enum : ['book', 'movie', 'speech', 'tv', 'anime', 'other']
    }

    
}, {timestamps: true}) 



module.exports = mongoose.model('Saying', sayingSchema);