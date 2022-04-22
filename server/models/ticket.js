const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Ticket = new Schema({
    projectReference: {
        type: String,
        unique: true
    },
    title: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    status: String,
    createdDate: String,
    ticketOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ticketCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Ticket', Ticket);