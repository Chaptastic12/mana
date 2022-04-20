const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: {
        type: String,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isGuest: {
        type: Boolean,
        default: false
    },
    isRegUser: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', User);