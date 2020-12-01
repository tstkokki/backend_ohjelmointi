//const express = require('express');

//const userRouter = express.Router();
//relative path - actual path is decided using mount point
// where this routers is mounter on
//userRouter.route('/');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

// const userSchema = new Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// }, {
//     timestamps: true
// });

var User = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps:true
});

User.plugin(passportLocalMongoose);

//var Users = mongoose.model('Users', User);

module.exports = mongoose.model('Users', User);