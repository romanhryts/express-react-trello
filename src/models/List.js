const mongoose = require('mongoose').default;

const List = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cards: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Card'
    }
}, { timestamps: true,  versionKey: false });

module.exports = mongoose.model('List', List);