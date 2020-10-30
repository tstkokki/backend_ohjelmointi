const express = require('express');
const bodyParser = require('body-parser');
const messageRouter = express.Router();

const Messages = require('../models/messages');

messageRouter.use(bodyParser.json());

// The root endpoint of our messagerouter:
// ----------------------------------------
messageRouter.route('/')
// GET
.get( (req, res, next) => {

    // Find all messages and return them as JSON
    Messages.find({}) // find every message

    .then( (msgs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(msgs);
        res.end("GET request handled!");
    });
})
// POST
.post( (req, res, next) => {
    // creates a new message-object from http-body
    Messages.create(req.body)
    .then( (msg)  => {
        console.log('Message created: ' + msg);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(msg);
    })
    .catch((err)=>{
        console.log(err);
    })
})
// PUT? (Update)
.put((req, res, next) =>{
    //Update message with id
    return res.send('Receiver a PUT HTTP method');
})
// DELETE?
.delete((req, res)=>{
    return res.send('Received DELETE method');
})

// The messageId-endpoint of our messagerouter:
// ----------------------------------------
messageRouter.route('/:messageId')
// GET request
.get( (req, res, next) => {
    // Find given message
    Messages.findById(req.params.messageId) 

    .then( (msg) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(msg);
        //res.end("GET request handled!");
    });
})
// .put 
// Messages.findByIdAndUpdate
.put((req, res, next) =>{
    Messages.findByIdAndUpdate(req.params.messageId)

    .then((message)=>{
        console.log(message);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(message);
    })
})
// DEL request
.delete( (req, res, next) => {

    Messages.findByIdAndRemove(req.params.messageId)

    .then( (resp) =>  {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    });

});

// The messageId/comments-endpoint of our messagerouter:
// ----------------------------------------
messageRouter.route('/:messageId/comments')
.get( (req, res, next) => {
    Messages.findById(req.params.messageId)
    .then( (msg) => {

        if (msg != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(msg.comments);
        }
        else {
            // virhe!!!
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end("Message not found!");
        }
    });
})
// This enables to post new comments to given message
.post((req, res, next) => {
        Messages.findById(req.params.messageId)
        .then( (msg) => {
           
            if (msg != null){
                // push new comment(s) into the message
                msg.comments.push(req.body);
                msg.save()
                .then( (msg) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(msg);
                })
            }
            else {
                // virhe!!!
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end("Message not found!");
            }
        });
    });

/*
.put();
*/

module.exports = messageRouter;