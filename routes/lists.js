const express = require("express");
const router = express.Router();
const List = require("../models/List");
const Todo = require("../models/Todo");
const { isAuth } = require("../utils/authcheck");

// Get All the Lists
router.get( '/' , isAuth, (req, res) => {
  List.find()
      .sort({ date: -1 })
      .then( lists => res.json(lists));
})

// Make a new List
router.post( '/' ,  isAuth, (req, res) => {
  newList = new List({
    name: req.body.name
  });

  newList.save().then( list => res.json(list));
})

// Add a new ToDo to the list
router.post('/todo/:id',  isAuth, (req, res) => {
  newTodo = new Todo({
    name: req.body.name
  })
  List.findOneAndUpdate(
    { _id: req.params.id},
    {$push: { todos: newTodo }})
    .then( list => res.json(list));
})

// Delete a single Todo from a given list
router.delete('/todo/:id',  isAuth, (req, res) => {
  newTodo = new Todo({
    name: req.body.name
  })
  List.findOne(
    { _id: req.params.id}, (err, list) => {
      list.todos.id(req.body.id).remove();
      list.save()
      .then(list => res.json(list));
    });
    // .then( list => list.todos.id(req.body.id).remove().then(list.save()));
})

module.exports = router;