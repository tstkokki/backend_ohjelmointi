//setup
const port = 3000;
const hostname = 'localhost';
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = 'mongodb://localhost:27017/messagedb';



const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // don't build indexes
    poolSize: 10, // maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, //close sockets after 45s of inactivity
    family: 4 // use IPv4, skip IPv6
};


var cookieParser = require('cookie-parser');
var session = require('express-session');

var connect = mongoose.connect(url, options);

//create express app
var app = express();
app.use(morgan('dev'));

// use cookies
app.use(cookieParser());
//use session with secret key
app.use(session(
    {secret:'Very very secret!',
    resave: false,
    saveUninitialized: false
    }));

//basic authentication
function auth(req, res, next){
    console.log(req.headers);
    console.log('Session data: ', req.session);
    if(req.session.user){
        if(req.session.user == 'admin'){
            next();
        }
    } else{

        var authHeader = req.headers.authorization;
        if(authHeader == null){
            console.log("No authorization header found");
            res.setHeader('WWW-Authenticate', 'Basic');
            var err = new Error('Not authenticated!');
            err.status = 401;
            next(err);
        } else {
            //process the authorization header info
            //split
            var auth_string = authHeader.split(' ')[1];
            //decode (base64)
            var decoded_auth = new Buffer.from(auth_string, 'base64').toString();
            //get username and password
            let username = decoded_auth.split(':')[0];
            let password = decoded_auth.split(':')[1];
            //check username and password
            if (username == 'Naapuri' && password == 'Pirkko'){
                req.session.user = 'admin';
                // proceed
                next();
            } else {
                console.log("Wrong username and/or password");
                // if(req.cookies.login_attempts){
                //     //get biscuits and add one
                //     let attempts = parseInt(req.cookies.login_attempts);
                //     attempts++;
                //     res.cookie('login_attempts', attempts);
                // } else {
                //     res.cookie('login_attempts', '1');
                // }
                res.setHeader('Authenticate', 'Basic');
                var err = new Error('Not Authenticated!');
                err.status = 401;
                next(err);
            }
        }   
    }
}
//use the authentication
app.use(auth);

//get the model for messages
//const Messages = require('./models/messages');

//get the routes and mount them
const msgRouter = require('./routes/messageRouter');

app.use('/messages', msgRouter);

//connect to mongo
connect.then((db) => {
    console.log("DB Connection established");
}).catch((err)=>{
    console.log(err);
})
//create the server
var server = http.createServer(app);

//start server
server.listen(port, hostname, ()=>{console.log('Server started!')});

