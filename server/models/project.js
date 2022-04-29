const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Project = new Schema({
    tickets: {
        openTickets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }],
        inProgress: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }],
        qualityCheck: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }],
        finishedTickets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }],
        backlogTickets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }],
    },
    projectReference: String,
    projectName: String,
    createdDate: String,
    numTickets: Number
});

module.exports = mongoose.model('Project', Project);