const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String, required: true
    },
    author: {
        type: String, required: true
    },
    postdate: {
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);