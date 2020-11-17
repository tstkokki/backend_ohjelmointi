var passport = require('passport');

//local strategy class
var LocalStrategy = require('passport-local').Strategy;

//User schema
var User = require('./models/users');

//tell passport to use local strat
//option 1
//passport.use(User.createStrategy());
//option 2
passport.use(new LocalStrategy(User.authenticate()));

//These are the serialization methods
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

