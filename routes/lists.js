const express = require("express");
const router = express.Router();
const List = require("../models/List");
const Todo = require("../models/Todo");


// Get All the Lists
router.get( '/' , (req, res) => {
  List.find()
      .sort({ date: -1 })
      .then( lists => res.json(lists));
})

// Make a new List
router.post( '/' , (req, res) => {
  newList = new List({
    name: req.body.name
  });

  newList.save().then( list => res.json(list));
})

// Add a new ToDo to the list
router.post('/todo/:id', (req, res) => {
  newTodo = new Todo({
    name: req.body.name
  })
  List.findOneAndUpdate(
    { _id: req.params.id},
    {$push: { todos: newTodo }})
    .then( list => res.json(list));
})

// Delete a Todo from a given list
router.delete('/todo/:id', (req, res) => {
  newTodo = new Todo({
    name: req.body.name
  })
  List.findOne(
    { _id: req.params.id}, (err, list) => {
      list.todos.id(req.body.id).remove();
      list.save();
    });
    // .then( list => list.todos.id(req.body.id).remove().then(list.save()));
})

module.exports = router;