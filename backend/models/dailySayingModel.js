const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailySayingSchema = new Schema({
    firbaseID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sayingID: {
        type: Schema.Types.ObjectId,
        ref: 'Saying',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    isSeen: {
        type: Boolean,
        required: true,
    },
})

module.exports = mongoose.model('DailySaying', dailySayingSchema)