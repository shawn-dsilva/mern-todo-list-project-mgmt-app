const express = require("express");
const router = express.Router();
const List = require("../models/List");
const Todo = require("../models/Todo");



router.get( '/' , (req, res) => {
  List.find()
      .sort({ date: -1 })
      .then( lists => res.json(lists));
})

router.post( '/' , (req, res) => {
  newList = new List({
    name: req.body.name
  });

  newList.save().then( list => res.json(list));
})

router.post('/:id', (req, res) => {
  newTodo = new Todo({
    name: req.body.name
  })
  List.findOneAndUpdate(
    { _id: req.params.id},
    {$push: { todos: newTodo }}
    );
})
