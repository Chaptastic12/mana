const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket')
const { isUserRegularUser } = require('../middleware/privilegeMiddlware');

router.get('/', ( req, res ) => {
    console.log('reached ticketRoutes')
})

router.post('/addNewTicket', isUserRegularUser, ( req, res ) => {
    console.log('reached ticketRoutes')
    console.log(req.body)
    let ticket = new Ticket(req.body);
    ticket.save(req.body);

    res.send({success: true, msg: 'Succesfully Added Ticket'})
})


module.exports = router;