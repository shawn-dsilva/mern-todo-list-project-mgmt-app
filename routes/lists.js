const express = require("express");
const router = express.Router();
const List = require("../models/List");
const Todo = require("../models/Todo");
const { isAuth } = require("../controllers/AuthController");
const { getAllLists, getSingleList, createNewList, addTodo, deleteTodo, deleteItemInTodo, addItem,addItemInTodo, deleteItem, markDone, markDoneInTodo, changeStatusTodo } = require("../controllers/ListController");

// Get All the Lists
router.get("/", isAuth, getAllLists );

// Get One Listing by Id
router.get("/:listId", isAuth, getSingleList );
// Make a new List
router.post("/", isAuth, createNewList);

// Add a new ToDo to the list
// This is an Atomic Operation
router.post("/:listId", isAuth, addTodo );

// Delete a single Todo from a given list
// This is an Atomic Operation
router.delete("/:listId/todo/:todoId", isAuth, deleteTodo );


//Add a checklist item
// This is an Atomic operation
router.post("/checklist/:listId", isAuth, addItem );

//Add a checklist item in a Todo
// This is an Atomic operation
router.post("/:listId/todo/:todoId", isAuth, addItemInTodo );

//Change status to InProgress, Done or NotStarted
// This is an Atomic operation
router.put("/:listId/todo/:todoId", isAuth, changeStatusTodo );


//Change a checklist item state to done
// This is an Atomic operation
router.put("/:listId/item/:itemId", isAuth, markDone );


//Change a checklist item inside a Todo's state to done
// This is an Atomic operation
router.put("/:listId/todo/:todoId/item/:itemId", isAuth, markDoneInTodo );

// Delete a single item from a given checklist
// This is an Atomic Operation
router.delete("/:listId/item/:itemId", isAuth, deleteItem );

// Delete a single item from a given checklist in a Todo
// This is an Atomic Operation
router.delete("/:listId/todo/:todoId/item/:itemId", isAuth, deleteItemInTodo );

module.exports = router;
