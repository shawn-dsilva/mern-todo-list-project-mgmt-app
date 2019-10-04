const List = require("../models/List");
const Todo = require("../models/Todo");
const Item = require("../models/Item");
const mongoose = require('mongoose');


exports.getAllLists = (req, res) => {
  List.find({ user: req.session.user.id})
    .sort({ date: -1 })
    .populate("user")
    .then((lists) => res.json(lists));
};

exports.getSingleList = (req, res) => {
  List.findOne({
    user: req.session.user.id,
    _id: req.params.listId
  })
    .then((list) => res.json(list));
};

exports.getSingleTodo = (req, res) => {
  List.findOne({
    user: req.session.user.id,
    _id: req.params.listId,
    'todos._id': req.params.todoId
  }, { "todos.$": 1 })
    .then((list) => res.json(list));
};
exports.createNewList = (req, res) => {
  newList = new List({
    name: req.body.name,
    user: req.session.user.id
  });
  newList.save().then((list) => res.json(list));
};


exports.deleteOneList = (req, res) => {
  List.findOneAndDelete({
    user: req.session.user.id,
    _id: req.params.listId
  })
    .then((list) => res.json(list));
};


exports.addTodo = (req, res) => {
  newTodo = new Todo({
    name: req.body.name
  });
  List.findOneAndUpdate(
    { _id: req.params.listId, user: req.session.user.id },
    {
      $push: { todos: newTodo } // Adds new ToDo to todos array
    },
    { new: true } // This option returns the modified document, not the original one
  ).then((list) => res.json(list.todos[list.todos.length-1]));
};

exports.changeStatusTodo = (req, res) => {
  const status = req.body.status.toString();
  switch(status) {
    case 'Done':
    case 'InProgress':
    case 'NotStarted':
        List.findOneAndUpdate(
          { _id: req.params.listId, user: req.session.user.id },
          {
            $set: { "todos.$[todos].status": req.body.status } // Adds new ToDo to todos array
          },
          {
            "arrayFilters": [ { "todos._id" : req.params.todoId } ],
            "new": true,
         }
        ).then((list) => res.json(list));
        break;
    default:
      res.status(422).json("Error : Invalid Input");
  }

};

exports.deleteTodo = (req, res) => {
  List.findOneAndUpdate(
    { _id: req.params.listId, user: req.session.user.id },
    {
      $pull: { todos: { _id: req.params.todoId } } // Deletes the todo using it's id from request body
    },
    { new: true }
  ).then((list) => res.json(list));
};

exports.addItem = (req, res) => {
  newItem = new Item({
    name: req.body.name
  });

    List.findOneAndUpdate(
      { _id: req.params.listId, user: req.session.user.id },
      {
        $push: { checklist: newItem } // Adds new Item to checklist array
      },
      { new: true } // This option returns the modified document, not the original one
    ).then((list) => res.json(list));
  };

exports.addItemInTodo = (req,res ) => {
  newItem = new Item({
    name: req.body.name
  });

  List.findOneAndUpdate(
    { user: req.session.user.id,
      _id: req.params.listId,
    },
    {
      $push: { "todos.$[todo].checklist": newItem },
      // Adds new Item to checklist array
    },
    {
      "arrayFilters": [ { "todo._id" : req.params.todoId }],
      "new": true, // This option returns the modified document, not the original one
    }
  ).then((list) => {
    const checklist = list.todos.id(req.params.todoId).checklist;
    res.json(checklist[checklist.length-1])
  });
};


exports.markDone = (req, res) => {

    List.findOneAndUpdate(
      { _id: req.params.listId, user: req.session.user.id },
      {
        $set: { "checklist.$[item].isDone": true } // Adds new Item to checklist array
      },
      {
        "arrayFilters": [ {"item._id": req.params.itemId }],
        "new": true
       } // This option returns the modified document, not the original one
    ).then((list) => res.json(list));
};

exports.markDoneInTodo = (req, res) => {
  if(typeof req.body.isDone === 'boolean') {
  const isDone = !req.body.isDone;
  List.findOneAndUpdate(
    { user: req.session.user.id,
      _id: req.params.listId,
    },
    {
      $set: { "todos.$[todos].checklist.$[item].isDone": isDone } // Adds new Item to checklist array
    },
    {
      "arrayFilters": [ { "todos._id" : req.params.todoId }, {"item._id": req.params.itemId }],
      "new": true, // This option returns the modified document, not the original one
    }
  ).then((list) => {
    const checklist = list.todos.id(req.params.todoId).checklist.id(req.params.itemId);
    res.json(checklist)});
  } else {
    res.status(400).json('error');
  }
}

exports.deleteItem = (req, res) => {
    List.findOneAndUpdate(
      { _id: req.params.listId, user: req.session.user.id },
      {
        $pull: { checklist: { _id: req.params.itemId } } // Adds new Item to checklist array
      },
      { new: true } // This option returns the modified document, not the original one
    ).then((list) => res.json(list));
};

exports.deleteItemInTodo = (req,res ) => {

  List.findOneAndUpdate(
    { user: req.session.user.id,
      _id: req.params.listId,
    },
    {
      $pull: { "todos.$[todo].checklist": { _id: req.params.itemId } } // Adds new Item to checklist array
    },
    {
      "arrayFilters": [ { "todo._id" : req.params.todoId }],
      "new": true // This option returns the modified document, not the original one
    }
  ).then((list) => res.json(list));
};