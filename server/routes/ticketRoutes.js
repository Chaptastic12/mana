const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const Project = require('../models/project');
const User = require('../models/user');
const { isUserRegularUser } = require('../middleware/privilegeMiddlware');

router.get('/getSpecificTicket/:projectReference', ( req, res ) => {
    Ticket.findOne({projectReference: req.params.projectReference}).populate('ticketOwner').populate('ticketCreator').exec((err, foundTicket) => {
        if (err) throw err;

        res.send(foundTicket)
    })
})

router.get('/getAllTickets', (req, res) => {
    Ticket.find({}, (err, allTickets) => {
        if (err) throw err;
        res.send({ success: true, tickets: allTickets });
    })
})

router.post('/addNewTicket', isUserRegularUser, ( req, res ) => {
    //Get our project reference by removing the numbers
    const projRef = req.body.projectReference.split('-')[0];
    Project.findOne({projectReference: projRef}).populate('tickets').exec((err, foundProject) => {
        if (err) throw err;

        //Update our ticket with the info in our database based off the uernames passed in.
        User.findOne({username: req.body.ticketOwner.username}, (err, foundTicketOwner) => {
            if (err) throw err;
            req.body.ticketOwner = foundTicketOwner._id;
            User.findOne({username: req.body.ticketCreator.username}, (err, foundTicketCreator) => {
                if (err) throw err;
                    req.body.ticketCreator = foundTicketCreator._id;
                    req.body.comments = []; //Clear out the ticket info as there are no comments initially

                //Save our ticket, and update the project with the resulting ._id
                const newTicket = new Ticket(req.body);
                newTicket.save().then(result =>{
                    const ticketType = findCorrectArray(result.status);
                    foundProject.tickets[ticketType].push(result._id);
                    foundProject.numTickets += 1;
                    foundProject.save();
                });
            });
        });
    });
});

router.post('/updateTicketInformation', isUserRegularUser, (req, res) => {
    const id = req.body.ticket._id;
    const projRef = req.body.ticket.projectReference.split('-')[0];

    Ticket.findById(id).populate('ticketOwner').populate('ticketCreator').exec((err, foundTicket) => {
        //Check if the ticketCreator changed; If it has, update the ID
        if (req.body.ticket.ticketCreator.username !== foundTicket.ticketCreator.username){
            User.findById(req.body.ticket.ticketCreator._id, (err, foundTicketCreator) => {
                if (err) throw err;
                req.body.ticket.ticketCreator = foundTicketCreator._id;
            })
        }
        //Check if the ticketOwner changed; If it has, update the ID
        if (req.body.ticket.ticketOwner.username !== foundTicket.ticketOwner.username){
            User.findById(req.body.ticket.ticketOwner._id, (err, foundTicketOwner) => {
                if (err) throw err;
                req.body.ticket.ticketOwner = foundTicketOwner._id;
            })
        }

        //Check if status has changed
        if(req.body.ticket.status !== foundTicket.status){
            //Remove from old array, and just push to the end of the new array
            Project.findOne({projectReference: projRef}).populate('tickets').exec((err, foundProject) => {
                if (err) throw err;
                //Find the correct origin and ending destiantion of our moving ticket
                const currentTicketType = findCorrectTicketType(foundTicket.status);
                const newTicketType = findCorrectTicketType(req.body.ticket.status);
                //Get the index of the ticket in the old array
                const currentTicketIndex = foundProject.tickets[currentTicketType].findIndexOf(foundTicket._id);
                //Remove the ticket from the old status array
                foundProject.tickets[currentTicketType].slice(currentTicketIndex, 1);
                //Push the ticket into the new status array, at the end
                foundProject.tickets[newTicketType].push(foundTicket._id)
                //Save project
                foundProject.save();
            })
        }

        foundTicket.description = req.body.ticket.description;
        foundTicket.status = req.body.ticket.status;
        foundTicket.title = req.body.ticket.title;
        foundTicket.ticketOwner = req.body.ticket.ticketOwner;
        foundTicket.ticketCreator = req.body.ticket.ticketCreator;

        foundTicket.save();
        res.send({success: true, msg: 'Ticket has been updated'})
        
    })
})

router.post('/updateTicketStatus', isUserRegularUser, (req, res) => {
    const { source, destination, projRef } = req.body;
    const projectReference = projRef.split('-')[0];

    Project.findOne({projectReference: projectReference}).populate('tickets').exec((err, foundProject) => {
        if (err) throw err;
        const updatedTicketOrder = moveTicketToCorrectArray(source, destination, foundProject);        
        foundProject = updatedTicketOrder;
        foundProject.save();

        Ticket.findOne({projectReference: projRef}, (err, foundTicket) => {
            if (err) throw err;
            foundTicket.status = findCorrectArray(destination.droppableId);
            foundTicket.save();
            res.send({ success: true, msg: 'Ticket status / Project order updated.' })
        })
    
    });
})

//DroppablieId passes us the name of the column, which we need to convert to the status type
const findCorrectArray = ( status ) =>{
    let result = '';

    switch(status){
        case('Open Items'):
            result = 'Open'
            break;
        case('In Progress Items'):
            result = 'In Progress'
            break;
        case('Quality Check Items'):
            result = 'Quality Check'
            break;
        case('Finished Items'):
            result = 'Finished'
            break;
        case('Backlog Items'):
            result = 'Backlog'
            break;
        default:
            result = ''
            break;
    }
    return result;
}

const moveTicketToCorrectArray = (source, destination, project) => {
    let movingTicket;
    switch(source.droppableId){
        case('Open Items'):
            movingTicket = project.tickets.openTickets[source.index]
            project.tickets.openTickets.splice(source.index, 1);
            break;
        case('In Progress Items'):
            movingTicket = project.tickets.inProgress[source.index]
            project.tickets.inProgress.splice(source.index, 1);
            break;
        case('Quality Check Items'):
            movingTicket = project.tickets.qualityCheck[source.index]
            project.tickets.qualityCheck.splice(source.index, 1);
            break;
        case('Finished Items'):
            movingTicket = project.tickets.finishedTickets[source.index]
            project.tickets.finishedTickets.splice(source.index, 1);
            break;
        case('Backlog Items'):
            movingTicket = project.tickets.backlogTickets[source.index]
            project.tickets.backlogTickets.splice(source.index, 1);
            break;
        default:
            console.log('break')
            break;
    }

    switch(destination.droppableId){
        case('Open Items'):
            project.tickets.openTickets.splice(destination.index, 0, movingTicket);
            break;
        case('In Progress Items'):
            project.tickets.inProgress.splice(destination.index, 0, movingTicket);
            break;
        case('Quality Check Items'):
            project.tickets.qualityCheck.splice(destination.index, 0, movingTicket);
            break;
        case('Finished Items'):
            project.tickets.finishedTickets.splice(destination.index, 0, movingTicket);
            break;
        case('Backlog Items'):
            project.tickets.backlogTickets.splice(destination.index, 0, movingTicket);
            break;
        default:
            console.log('break')
            break;
    }

    return project;
}

const findCorrectTicketType = ( status ) => {
    let result = '';

    switch(status){
        case('Open Items'):
            result = 'openTickets'
            break;
        case('In Progress Items'):
            result = 'inProgress'
            break;
        case('Quality Check Items'):
            result = 'qualityCheck'
            break;
        case('Finished Items'):
            result = 'finishedTickets'
            break;
        case('Backlog Items'):
            result = 'backlogTickets'
            break;
        default:
            result = ''
            break;
    }
    return result;
}

module.exports = router;