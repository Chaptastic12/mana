const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { isUserAnAdminUser, isUserRegularUser } = require('../middleware/privilegeMiddlware');

router.get('/getUserInformation', ( req, res ) => {
    //req.user stores our user information, so just send this back
    if(req.isAuthenticated()) console.log(true)
    else                      console.log(false)

    res.send(req.user)

});

router.post('/registerUser', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email ) {
      res.send("Improper Values");
      return;
    }
    //Check if username exists
    User.findOne({ username }, async (err, foundUser) => {
      if (err) throw err;
      if (foundUser) res.send({success: false, msg: "User Already Exists" });
      if (!foundUser) {
          //Check if email exists or not
          User.findOne({ email }, async (err, foundUserEmail) => {
              if(err) throw err;
              if(foundUserEmail) res.send({success: false, msg: 'User Already Exists'});
              if(!foundUserEmail){
                let user = new User({
                    username: username,
                    email: email,
                    password: bcrypt.hashSync(password, 10)
                  });
                  user.save().then(user => console.log(user));
                  res.send({ success: true, msg: 'User successfully logged in', userInfo: { username: user.username, isAdmin: user.isAdmin, isRegUser: user.isRegUser, isGuest: user.isGuest } });
              }
          })
        }
    })
  });

router.post("/loginUser", (req, res, next) => {
    passport.authenticate("local", (err, user, failInfo) => {
        if (err) {
            res.status(500)
            res.send( { success: false, msg: 'Error attempting to log you in. '} );
            return;
        }
        if (!user){
            // res.status(401);
            res.send( { success: false, msg: failInfo } );
            return;
        }

        req.login(user, (err) => {
            if (err) {
                res.status(500);
                res.send( { success: false, msg: 'Error logging user in.' } );
                return;
            }

            res.status(200);
            res.send({
                msg: 'Welcome, ' + req.user.username,
                success: true,
                userInfo: {
                    username: req.user.username,
                    isAdmin: req.user.isAdmin,
                    isRegUser: req.user.isRegUser,
                    isGuest: req.user.isGuest
                }
            }); 
        })
    })(req, res, next);
});

router.post('/logoutUser', (req, res) => {
    req.logOut();
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

router.get('/getAllUsers', (req, res) => {
    if(req.isAuthenticated()){
        User.find({isGuest: false}).select({'username': 1}).exec((err, foundUsers) => {
            res.send(foundUsers)
        })
    } else {
        res.send({success: false, msg: 'Access prohibited'})
    }


})

module.exports = router;