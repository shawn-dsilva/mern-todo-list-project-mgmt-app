const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TodoSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
      type: String,
      required: true,
      enum: [ 'Done', 'InProgress', 'NotStarted'],
      default: 'NotStarted'
    }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);