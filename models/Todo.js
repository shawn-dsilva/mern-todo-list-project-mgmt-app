const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const item = require("./Item");

// Create Schema
const TodoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    default: "No Description. Click Edit to add a Description",
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ["Done", "InProgress", "NotStarted"],
    default: "NotStarted"
  },
  checklist: [item.schema]
});

module.exports = Todo = mongoose.model("todo", TodoSchema);
