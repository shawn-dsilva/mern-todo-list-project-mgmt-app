const List = require("../models/List");
const Todo = require("../models/Todo");

exports.getAllLists = (req, res) => {
  List.find()
    .sort({ date: -1 })
    .populate("user")
    .then((lists) => res.json(lists));
};

exports.createNewList = (req, res) => {
  newList = new List({
    name: req.body.name,
    user: req.session.user.id
  });
  newList.save().then((list) => res.json(list));
};

exports.addTodo = (req, res) => {
  newTodo = new Todo({
    name: req.body.name
  });
  List.findOneAndUpdate(
    { _id: req.params.id, user: req.session.user.id },
    {
      $push: { todos: newTodo } // Adds new ToDo to todos array
    },
    { new: true } // This option returns the modified document, not the original one
  ).then((list) => res.json(list));
};

exports.deleteTodo =  (req, res) => {
  List.findOneAndUpdate(
    { _id: req.params.id, user: req.session.user.id },
    {
      $pull: { todos: { _id: req.body.id } } // Deletes the todo using it's id from request body
    },
    { new: true }
  ).then((list) => res.json(list));
};