const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Project = new Schema({
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }],
    projectShortName: String,
    projectName: String,
    createdDate: String
});

module.exports = mongoose.model('Project', Project);