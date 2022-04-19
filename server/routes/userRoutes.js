const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { isUserAnAdminUser } = require('../middleware/privilegeMiddlware');

router.get('/getUserInformation', ( req, res ) => {
    //req.user stores our user information, so just send this back
    res.send(req.user)

});

router.post('/registerUser', async (req, res) => {
    User.findOne({ username: req.body.data.username }, async (err, foundUser) => {
        if (err) throw err;
        if (foundUser) res.send('User already exists');
        let newUser = new User({
            username: req.body.data.username,
            email: req.body.data.email,
            isGuest: false,
            isRegUser: true,
            isAdmin: false
        })
        if (!foundUser) {
            User.register(newUser, req.body.data.password, (err, user) => {
                if (err) throw err;
                else {
                   const authenticate = User.authenticate();
                   authenticate(req.body.data.username, req.body.data.password, (err, result) => {
                       if (err) throw err;
                       if ( result === false ){
                           res.send({
                            msg: 'Login Failed, please try again.',
                            success: false
                         })
                       } else {
                           res.send({
                               msg: 'Welcome, ' + result.username,
                               success: true
                            })
                       }
                   })
                }
            })
      
        }
    })

})

router.post('/loginUser', (req, res, next) => {
    const authenticate = User.authenticate();
    authenticate(req.body.data.username, req.body.data.password, (err, result) => {
        if (err) throw err;
        if ( result === false ){
            res.send({
                msg: 'Login Failed, please try again.',
                success: false
            });
        } else {
            User.findOne({username: req.body.data.username}, (err, foundUser) =>{
                if (err) throw err;
                res.send({
                    msg: 'Welcome, ' + result.username,
                    success: true,
                    userInfo: {
                        username: foundUser.username
                    }
                });
            });
        }
    });
})

router.post('/logoutUser', (req, res) => {
    req.logout();
    res.send({
        msg: 'Logout successfull',
        success: true
    });
})

router.post('/deleteUser', isUserAnAdminUser, async (req, res) => {
    const id = req.body.id;

    await User.findByIdAndDelete(id, (err) => {
        if (err) throw err;
    });
    res.send('User has been deleted.');
})

module.exports = router;