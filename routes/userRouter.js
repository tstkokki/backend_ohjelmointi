const express = require('express');
const Users = require('../models/users');
const bodyParser = require('body-parser');
const session = require('express-session');

var userRouter = express.Router();

// Use body-parser to get data from body
userRouter.use(bodyParser.json());
//This router is supposed to be mounted to e.g. /users
// routes
// POST for signup
userRouter.post('/signup', (req, res, next) =>{
    console.log('Signup!');
//1. get the username & password from body (as json)
    //req.body.username
    //req.body.passwprd
    if(req.body.username){
        //Try to find submitted username
        Users.findOne({username: req.body.username})
        .then((user) => {
            //If user already exists
            if(user != null){
                var err = new Error('User '+req.body.username+' already exists!');
                err.status = 403;
                next(err); //expressin virheenkäsittelijä hoitelee ja näyttää käyttäjälle
            } else {
                //2. create a new user via Users model (using mongoose)
                return Users.create({username: req.body.username, password: req.body.password});
            }
        })
        .then((user) => {
            res.status = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({user: user});
        })
        .catch((err) => {
            next(err);
        });
    }
    else {
        // no username given
        var err = new Error('No username given');
        err.status = 403;
        next(err);
    }
// - handle possible errors
//3. registration successful ,redirect?

});


// POST for login
userRouter.post('/login', (req, res, next) =>{
    if(req.session.user){
        if(req.session.user == 'logged'){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>You are already logged in</h1>');
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

                //1. Get the username & password from the request body
                //req.body.username
                //req.body.passwprd
                Users.findOne({username: username}).then((foundUser)=>{
                if(foundUser == null){
                    var err = new Error('Username ' + username + ' not found!');
                    err.status = 403;
                    next(err);
                }
                else if(foundUser.password != password){
                    //wrong password
                    var err = new Error('Wrong password! Better luck next time, slugheads!');
                    err.status = 403;
                    next(err);
                }
                else if(foundUser.username == username && foundUser.password == password){
                    //correct username and password
                    req.session.user == 'logged in';
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<h1>Logged in</h1>');
                }
            });
            }
        }
    //2. Try to find matching username from database

    //3. Check password
});
// GET for logout
userRouter.get('/logout', (req, res, next) =>{
    if(req.session){
        //user is logged in
        //destroy session
        req.session.destroy();
        console.log("Session ended");
        //clear cookie
        res.clearCookie('session-id');
        console.log('Cookie cleared from response');
        res.redirect('/');
    } else{
        //user is not logged in
        var err = new Error('You are not logged in, galaxy brain');
        next(err);
    }
})


module.exports = userRouter;