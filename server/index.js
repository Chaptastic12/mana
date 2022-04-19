const express         = require('express');
const mongoose        = require('mongoose');
const cors            = require('cors');
const bodyParser      = require('body-parser');
const passport        = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const cookieParser    = require('cookie-parser');
const User            = require('./models/user');

const projectRoutes = require('./routes/projectRoutes');
const ticketRoutes  = require('./routes/ticketRoutes');
const userRoutes    = require('./routes/userRoutes');

//Checkif production or not
if(process.env.NODE_ENV !== 'production'){
    //Load  our .env variables
    require('dotenv').config();
}
///////////
//
// CONNECT TO OUR DATABASE
//
///////////
const url = process.env.MONGO_DB_CONNECTION_STRING;
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

connect
    .then( db => { console.log('Connected to MANA server') })
    .catch( err => { console.log('Error attempting to reach server' + err )})

const app = express();

///////////
//
// MIDDLEWARE
//
///////////
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); //support json encoded bodies
app.use(cookieParser(process.env.SESSION_SECRET));

//Add our clientside URLs to our whitelist array
const whitelistedDomains = process.env.WHITELISTED_DOMAINS ? process.env.WHITELISTED_DOMAINS.split(',') : [];

const corOptions = {
    origin: (origin, callback) => {
        if(!origin || whitelistedDomains.indexOf(origin !== -1)){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}
app.use(cors(corOptions));

//Passport Configuration
app.use(require("express-session")({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) =>{
	res.locals.currentUser = req.user;
	next();
})

// require('./utils/passportConfig')(passport);
///////////
//
// END MIDDLEWARE
//
///////////w

///////////
//
// routes
//
///////////
app.use('/api/projects', projectRoutes);
app.use('/api/tickets',  ticketRoutes);
app.use('/api/auth',     userRoutes)

///////////
//
// START SERVER
//
///////////
const server = app.listen(process.env.PORT || 8081, ()=>{
    const port = server.address().port;

    console.log('App has started on port:',  port);
});