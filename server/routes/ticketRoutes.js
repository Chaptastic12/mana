const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket')
const Project = require('../models/project');
const { isUserRegularUser } = require('../middleware/privilegeMiddlware');

router.get('/', ( req, res ) => {
    console.log('reached ticketRoutes')
})

router.post('/addNewTicket', isUserRegularUser, ( req, res ) => {
    console.log('reached ticketRoutes')
    console.log(req.body.projectReference)
    // let ticket = new Ticket(req.body);
    // ticket.save(req.body);
    const projRef = req.body.projectReference.split('-')[0];
    Project.find({projectReference: projRef}).populate('tickets').exec((err, foundProject) => {
        if (err) throw err;
        const ticket = new Ticket(req.body);
        ticket.save()
        // Ticket.create(req.body).populate('ticketOwner').populate('ticketCreator').exec((err, newTicket) => {
        //     if (err) throw err;
        //     //Find user and add to ticket;

        //     foundProject.ticket.push(newTicket)
        //     foundProject.save()
        //     res.send({success: true, msg: 'Succesfully Added Ticket'})

        // })
    })

})


module.exports = router;