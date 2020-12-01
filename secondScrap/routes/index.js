const express = require('express');
const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const User = mongoose.model('User');
const path = require('path');
const auth = require('http-auth');

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd')
});

const { response } = require('../app');
//respond to any request from the root url
router.get('/', (req, res)=>{
    // pass title for template
    res.render('form', {title: 'Registration form'});
});

router.post('/', [
    check('name')
        .isLength({min: 1})
        .withMessage('Please enter a name'),
    check('email')
        .isLength({min: 1})
        .withMessage('Please enter an email')
], (req, res)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const registerUser = new User(req.body);
        registerUser.save()
            .then(() => {
                res.send('Thank you for your data :3');
            })
            .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
            });
    } else {
        res.render('form', {
            title: 'Registration form',
            errors: errors.array(),
            data: req.body
        });
    }
    // console.log(req.body);
    // // pass title for template
    // res.render('form', {title: 'Registration form'});
});

router.get('/user', basic.check((req, res) => {
    User.find()
        .then((registerUsers) => {
            res.render('index', {title: 'Listing registrations', registerUsers});
        })
        .catch(() => {
            res.send('Sorry! Something went wrong. :(');
        });
}));

module.exports = router;


//---------------------------------------------------------------
// const port = 3000;
// const hostname = 'localhost';
// const http = require('http');
// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// const url = 'mongodb://localhost:27017/projectdb';

// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     autoIndex: false, //don't build indexes
//     poolSize: 10, //maintain up to 10 socket connections
//     serverSelectionTimeoutMS: 5000, // attempt operations for 5s
//     socketTimeoutMS: 45000, //close sockets after 45s of inactivity
//     family: 4 //use IPv4
// };

// var cookieParser = require('cookie-parser');
// var session = require('express-session');

// var connect = mongoose.connect(url, options);

// //create express app
// var app = express();
// app.use(morgan('dev'));

// //use cookies
// app.use(cookieParser());
// //use session with secret key
// app.use(session({
//     secret: 'Very very secret!',
//     resave: false,
//     saveUninitialized: false
// }));

// //require passport and authentication setup
// const passport = require('passport');
// //const authenticate = require('./authenticate');

// //init passport
// app.use(passport.initialize());
// //passport session init
// app.use(passport.session());

// //public endpoint here before use auth
// // var userRouter = require('./routes/userRouter');
// // app.use('/user', userRouter);

// //authentication function

// //use auth

// //get the message router
// // const msgRouter = require('./routes/messageRouter');
// // const { appendFileSync} = require('fs');

// // app.use('/messages', msgRouter);

// //connect to mongo
// connect.then((db) => {
//     console.log("Connected to DB");
// }).catch((err)=>{
//     console.log(err);
// });

// var server = http.createServer(app);

// var api = require('./api');
// app.post('/project', api.post);
// app.get('/project/:title.:format?', api.show);
// app.get('/project', api.list);


// //start server
// server.listen(port, hostname, ()=>{
//     console.log('Server initiated');
// });

