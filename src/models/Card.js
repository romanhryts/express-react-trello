const mongoose = require('mongoose').default;

const Card = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    listID: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Card', Card);