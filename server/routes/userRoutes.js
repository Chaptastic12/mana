const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { isUserAnAdminUser } = require('../middleware/privilegeMiddlware');

router.get('/getUserInformation', ( req, res ) => {
    //req.user stores our user information, so just send this back
    res.send(req.user)

});

router.post('/registerUser', (req, res) => {
    User.findOne({ username: req.body.username }, async (err, foundUser) => {
        if (err) throw err;
        if (foundUser) res.send('User already exists');
        if (!foundUser) {
            const hashedPassword = await bcrypt.hash(req.body.passord, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                isGuest: false,
                isRegUser: true,
                isAdmin: false
            });
            await newUser.save();
            res.send('User has been registered.')
        }
    })

})

router.post('/loginUser', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send('No user exists.');
        else {
            req.logIn(user, err => {
                if(err) throw err;
                res.send('Successfully Authenticated.');
                console.log(req.user);
            });
        }
    })(req, res, next);

})

router.post('/logoutUser', (req, res) => {
    req.logout();
    res.send('User logged out.');
})

router.post('/deleteUser', isUserAnAdminUser, async (req, res) => {
    const id = req.body.id;

    await User.findByIdAndDelete(id, (err) => {
        if (err) throw err;
    });
    res.send('User has been deleted.');
})

module.exports = router;