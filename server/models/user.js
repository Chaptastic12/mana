const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const User = new Schema({
    username: String,
    email: String,
    isAdmin: Boolean,
    isGuest: Boolean,
    isRegUser: Boolean
});

module.exports = mongoose.model('User', User);