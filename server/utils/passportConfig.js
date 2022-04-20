const User = require('../models/user');
const { compareSync } = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');

passport.use(
    new localStrategy(( username, password, done ) => {
        User.findOne({ username: username }, (err, foundUser) => {
            if (err) return done(err);
            //No user found
            if (!foundUser) return done(null, false, { message: 'Incorrect Username provided' });
            //Passwords don't match
            if (!compareSync(password, foundUser.password)) {
                return done(null, false, { message: 'Incorrect Password' })
            }
            //User found
            return done(null, foundUser);
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, foundUser) => {
        if (err) throw err;
        done(null, { name: foundUser.username, id })
    })
}) 