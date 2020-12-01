const http = require('http');
const hostname = 'localhost';
const port = 3000;
const express = require('express');
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

var app = express();

connect.then((db)=> {
    console.log('DB connection established');
}).catch((err)=>{
    console.log(err);
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});