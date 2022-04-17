const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/getUserInformation', ( req, res ) => {
    console.log('User Info')
});

router.post('/registerUser', (req, res) => {
    User.findOne({ username: req.body.username }, async (err, foundUser) => {
        if (err) throw err;
        if (foundUser) res.send('User already exists');
        if (!foundUser) {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                isGuest: false,
                isRegUser: true,
                isAdmin: false
            });
            await newUser.save();
            res.send('User has been registered')
        }
    })

})
router.post('/loginUser', (req, res) => {
    console.log('User logged in')

})

module.exports = router;