const express         = require('express');
const mongoose        = require('mongoose');
const cors            = require('cors');
const bodyParser      = require('body-parser');
const passport        = require('passport');
const cookieParser    = require('cookie-parser');
const session         = require('express-session');
const projectRoutes   = require('./routes/projectRoutes');
const ticketRoutes    = require('./routes/ticketRoutes');
const userRoutes      = require('./routes/userRoutes');
const path            = require('path');

//Checkif production or not
if(process.env.NODE_ENV !== 'production'){
    //Load  our .env variables
    require('dotenv').config();
}

const publicPath = path.join(__dirname, 'Client/build');

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

app.use(express.static(publicPath));

///////////
//
// MIDDLEWARE
//
///////////

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:true,
    maxAge: Date.now() + (30 * 86400 * 1000)
}));

app.use(passport.initialize());
app.use(passport.session());

require('./utils/passportConfig');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); //support json encoded bodies

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

///////////
//
// END MIDDLEWARE
//
///////////

///////////
//
// ROUTES
//
///////////
app.use('/api/projects', projectRoutes);
app.use('/api/tickets',  ticketRoutes);
app.use('/api/auth',     userRoutes)

if(process.env.NODE_ENV === 'production'){
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "/Client/build", "index.html"));
    });
}

///////////
//
// START SERVER
//
///////////
const server = app.listen(process.env.PORT || 8081, ()=>{
    const port = server.address().port;

    console.log('App has started on port:',  port);
});