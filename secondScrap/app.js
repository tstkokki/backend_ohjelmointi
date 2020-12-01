//import express module and export value of routes
const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

//create express app
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//use routes folder for any / request
app.use('/', routes);

//use body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

module.exports = app;
