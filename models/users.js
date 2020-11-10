//const express = require('express');

//const userRouter = express.Router();
//relative path - actual path is decided using mount point
// where this routers is mounter on
//userRouter.route('/');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Users = mongoose.model('Users', userSchema);

module.exports = Users;