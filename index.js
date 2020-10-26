const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Messages = require('./models/messages');
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

connect.then((db) => {
    console.log('Connected to server!');
    
        Messages.insertMany([{
            title: "Maan kuoren yleisin alkuaine",
            content: "Vastaus on B: Alumiini",
            author: "Naapurin Pirkko",
            comments: [{
                content: "lol ei oo yleisin *alkuaine*",
                author: "xXtruN3rdXx",
                rating: 1
            }, {
                content: "Pirkko on hyvin viisas ja vahva",
                author: "Naapurin Markku",
                rating: 5
            }]
        },
        {
            title: "Bestest sound in the world",
            content: "NULL - object reference not set to an instance of an object",
            author: "legaM4st3r420",
            comments: [{
                content: "AudioSource audio = New AudioSource()",
                author: "unitedUnreal32",
                rating: 3
            }, {
                content: "Googlaaaaa",
                author: "SmurtPROgrammer",
                rating: 1
            }, {
                content: "Um.. excuse me, this question has already been answered before. don't post repeat questions. ",
                author: "Professor Josh McGruper",
                rating: 5
            }]
        },
        {
            title: "The average human fat molecule",
            content: "C-55 H-104 O-6",
            author: "Ur_local_chemistry_Teacher",
            comments: [{
                content: "And you breathe out about 80% of it?",
                author: "Insightful_readur",
                rating: 4
            }, {
                content: "bUt muh cAlOrIeS D:",
                author: "anonym456",
                rating: 2
            }]
        }
    ]).then((message) => {
        return Messages.find({}).exec(); //return promise
        
    }).then((messages) => {
        //console.log(messages);
        messages.forEach(comment => {
            console.log(comment);
        });
        return Messages.findOneAndUpdate({"author":"legaM4st3r420", "comments.author": "unitedUnreal32"}, {$set:{"comments.$.rating":5}}, {new: true});
    }).then((message) => {
        console.log("...\nUpdating...\n...\n...");
        return Messages.find({}).exec(); //return promise
        
    }).then((messages)=>{
        messages.forEach(comment => {
            console.log(comment);
        });
        return Messages.deleteMany({}); //returns a promise

    }).then(() => {
        //close connection
        return mongoose.connection.close(); //returns a promise
    }).then(()=> {
        console.log("Connection closed");
    }).catch((err) => {
        console.log(err);
    });
});

