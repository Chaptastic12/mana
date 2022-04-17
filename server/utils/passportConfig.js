const User = require('../models/user');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new localStrategy(( username, passwordField, done ) => {
            User.findOne({ username: username }, (err, foundUser) => {
                if (err) throw err;
                //No user found
                if (!foundUser) return done(null, false);
                //User found
                bcrypt.compare(password, foundUser.password, (err, result) => {
                    if (err) throw err;
                    if (result === true){
                        return done(null, foundUser)
                    }
                    else {
                        //Comparison failed
                        return done(null, false)
                    }
                });
            });
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    })

    passport.deserializeUser((id, cb) => {
        User.findOne({_id: id}, (err, foundUser) => {
            cb(err, foundUser);
        })
    })
}