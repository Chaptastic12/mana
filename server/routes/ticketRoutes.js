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
                    foundProject.tickets.push(result._id);
                    foundProject.save();
                });
            });
        });
    });
});

router.post('/updateTicketInformation', isUserRegularUser, (req, res) => {
    const id = req.body.id;
    Ticket.findById(id).populate('ticketOwner').populate('ticketCreator').exec((err, foundTicket) => {
        //Check if the ticketCreator changed; If it has, update the ID
        if (req.body.ticketCreator.username !== foundTicket.ticketCreator.username){
            User.findOne({username: req.body.ticketCreator.username}, (err, foundTicketCreator) => {
                if (err) throw err;
                req.body.ticketCreator = foundTicketCreator._id;
            })
        }
        //Check if the ticketOwner changed; If it has, update the ID
        if (req.body.ticketOwner.username !== foundTicket.ticketOwner.username){
            User.findOne({username: req.body.ticketOwner.username}, (err, foundTicketOwner) => {
                if (err) throw err;
                req.body.ticketOwner = foundTicketOwner._id;
            })
        }
        
        foundTicket.save();
        
    })
})

router.post('/updateTicketStatus', isUserRegularUser, (req, res) => {
    const { oldIndex, newIndex, projectReference, newStatus } = req.body;
    const projRef = projectReference.split('-')[0];
    
    Project.findOne({projectReference: projRef}).populate('tickets').exec((err, foundProject) => {
        if (err) throw err;
        const updatedTicketOrder = moveArrayItemToNewIndex(foundProject.tickets, oldIndex, newIndex);
        foundProject.save();

        Ticket.findOne({projectReference: projectReference}, (err, foundTicket) => {
            if (err) throw err;
            foundTicket.status = newStatus;
            foundTicket.save();
            res.send({ success: true, msg: 'Ticket status / Project order updated.' })
        })
    });


    //Find our ticket
    //Find our Project based off teh ticket
    //Update ticket status as well as index
    //save ticket
    //save project
    //return updated project
})

function moveArrayItemToNewIndex(arr, oldIndex, newIndex) {
    if (newIndex >= arr.length) {
        var k = newIndex - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr; 
};

module.exports = router;