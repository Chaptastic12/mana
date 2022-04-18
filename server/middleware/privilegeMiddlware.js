const User = require('../models/user');

const authMiddleware = {};

// Middleware that checks if the user is an administrator or not
authMiddleware.isUserAnAdminUser = (req, res, next) => {
    const user = req.user;

    if(user) {
        User.findOne({ username: user.username }, (err, foundUser) => {
            if (err) throw err;
            if(foundUser.isAdmin) {
                next();
            }
            else {
                res.send('You do not have the required priviliges to perform this action.');
            }
        })
    } else {
        res.send('You must first login to perform this action.');
    }
}

module.exports = authMiddleware;