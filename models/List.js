const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Todo = require("./Todo");
const Item = require("./Item");
// Create Schema
const ListSchema = new Schema ({
    user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    todos: [ Todo.schema ],
    checklist: [Item.schema ]
});

module.exports = List = mongoose.model('list', ListSchema);