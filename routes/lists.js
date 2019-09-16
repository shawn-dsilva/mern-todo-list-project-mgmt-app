const express = require("express");
const router = express.Router();
const List = require("../models/List");
const Todo = require("../models/Todo");
const { isAuth } = require("../controllers/AuthController");
const { getAllLists, createNewList, addTodo, deleteTodo, addItem,addItemInTodo, deleteItem, markDone } = require("../controllers/ListController");

// Get All the Lists
router.get("/", isAuth, getAllLists );

// Make a new List
router.post("/", isAuth, createNewList);

// Add a new ToDo to the list
// This is an Atomic Operation
router.post("/:listId", isAuth, addTodo );

// Delete a single Todo from a given list
// This is an Atomic Operation
router.delete(":listId/todo/:todoId", isAuth, deleteTodo );


//Add a checklist item
// This is an Atomic operation
router.post("/:listId/todo/", isAuth, addItem );

router.post("/:listId/todo/:todoId", isAuth, addItemInTodo );

//Change a checklist item state to done
// This is an Atomic operation
// router.put("/list/:listId/todo/:todoId", isAuth, markDone );

// Delete a single item from a given checklist
// This is an Atomic Operation
router.delete("/:listId/item/:itemId", isAuth, deleteItem );

module.exports = router;
