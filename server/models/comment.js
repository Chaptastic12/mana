const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Comment = new Schema({
    comment: String,
    createdDate: Date.now,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comment', Comment);