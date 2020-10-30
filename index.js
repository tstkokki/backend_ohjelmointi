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

var connect = mongoose.connect(url, options);

//create express app
var app = express();
app.use(morgan('dev'));

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

