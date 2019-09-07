const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todo = require("./Todo");
const item = require("./Item");
// Create Schema
const ListSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    todos: [todo],
    checklist: [item]
});

module.exports = List = mongoose.model('list', ListSchema);