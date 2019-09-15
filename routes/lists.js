const express = require("express");
const router = express.Router();
const List = require("../models/List");
const Todo = require("../models/Todo");
const { isAuth } = require("../controllers/AuthController");
const { getAllLists, createNewList, addTodo, deleteTodo } = require("../controllers/ListController");

// Get All the Lists
router.get("/", isAuth, getAllLists );

// Make a new List
router.post("/", isAuth, createNewList);

// Add a new ToDo to the list
// This is an Atomic Operation
router.post("/todo/:listId", isAuth, addTodo );

// Delete a single Todo from a given list
// This is an Atomic Operation
router.delete("/todo/:listId/:todoId", isAuth, deleteTodo );

module.exports = router;
