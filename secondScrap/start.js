const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/projectdb';

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

mongoose.connect(url, options)

mongoose.connection.on('open', () => {
    console.log('Mongoose connection open');
})
.on('error', (err) =>{
    console.log(`Connection error: ${err.message}`);
});
require('./models/user');
const app = require('./app');
const server = app.listen(3000, ()=> {
    console.log(`Listening port ${server.address().port}`);
});