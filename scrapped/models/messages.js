const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const messageSchema = new Schema({
    //title
    title: {
        type: String,
        required: true
    },
    //content
    content: {
        type: String,
        required: true
    },
    //author
    author: {
        type: String,
        required: true
    },
    //category
    category:{
        type: String,
        default: ""
    },
    comments: [commentSchema]
},
{
    timestamps: true
});

var Messages = mongoose.model('Message', messageSchema);
module.exports = Messages;