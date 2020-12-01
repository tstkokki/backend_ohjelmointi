const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const messageSchema = new Schema({
    project: ObjectId,
    date: {
        type: Date, default: Date.now
    },
    author: {
        type: String, required: true
    },
    post: {
        type: String
    }
});

module.exports = mongoose.model('Message', messageSchema);