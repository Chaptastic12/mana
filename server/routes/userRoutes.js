const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { isUserAnAdminUser } = require('../middleware/privilegeMiddlware');

router.get('/getUserInformation', ( req, res ) => {
    //req.user stores our user information, so just send this back
    if(req.isAuthenticated()){
        console.log(true)
    } else  { console.log(false)}
    console.log(req.session.passport)
    res.send(req.user)

});

router.post('/registerUser', async (req, res) => {
    const { username, password, email } = req.body.data;
    if (!username || !password || !email ) {
      res.send("Improper Values");
      return;
    }
    User.findOne({ username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
          console.log(req.body.data.username)
          let user = new User({
            username: req.body.data.username,
            email: req.body.data.email,
            password: bcrypt.hashSync(req.body.data.password, 10)
          });
          user.save().then(user => console.log(user));
          res.send({ succes: true, msg: 'User successfully logged in', userInfo: { username: user.username } });
      }
    })
  });

router.post("/loginUser", passport.authenticate("local"), (req, res) => {
    res.send({
        msg: 'Welcome, ' + req.user.username,
        success: true,
        userInfo: {
            username: req.user.username
        }
    });  
});

// router.post('/loginUser', (req, res, next) => {
//     const authenticate = User.authenticate();
//     authenticate(req.body.data.username, req.body.data.password, (err, result) => {
//         if (err) throw err;
//         if ( result === false ){
//             res.send({
//                 msg: 'Login Failed, please try again.',
//                 success: false
//             });
//         } else {
//             User.findOne({username: req.body.data.username}, (err, foundUser) =>{
//                 if (err) throw err;
//                 res.send({
//                     msg: 'Welcome, ' + result.username,
//                     success: true,
//                     userInfo: {
//                         username: foundUser.username
//                     }
//                 });
//             });
//         }
//     });
// })

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

module.exports = router;