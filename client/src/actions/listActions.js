import axios from 'axios';
import { GET_LIST, GET_SINGLE_LIST, CREATE_LIST,
  DELETE_LIST, CREATE_TODO, DELETE_TODO, GET_TODO,
CREATE_ITEM, STATUS_ITEM } from './types'

export const getList = () => (dispatch) => {
  axios
    .get("/api/lists", { withCredentials:true })
    .then((res) =>
      dispatch({
        type: GET_LIST,
        payload: res.data
      })
    )
};

export const createNewList = (name) => (dispatch) => {
  axios
    .post("/api/lists", { name: name }, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: CREATE_LIST,
        payload: res.data
      })
    )
};

export const getSingleList = (id) => (dispatch) => {
  axios
    .get("/api/lists/" + id, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: GET_SINGLE_LIST,
        payload: res.data
      })
    )
};

export const deleteOneList = (id) => (dispatch) => {
  axios
    .delete("/api/lists/" + id, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: DELETE_LIST,
        payload: id
      })
    )
};

export const createNewTodo = (listId, name) => (dispatch) => {
  axios
    .post("/api/lists/" + listId , { name: name }, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: CREATE_TODO,
        payload: res.data
      })
    )
};

export const getOneTodo = (listId, todoId) => (dispatch) => {
  axios
    .get("/api/lists/" + listId + "/todo/" + todoId, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: GET_TODO,
        payload: res.data
      })
    )
};

export const deleteOneTodo = (listId, todoId) => (dispatch) => {
  axios
    .delete("/api/lists/" + listId + '/todo/' + todoId, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: DELETE_TODO,
        payload: todoId
      })
    )
};

export const addNewItem = (listId, todoId, name) => (dispatch) => {
  axios
    .post("/api/lists/" + listId + '/todo/' + todoId , { name: name }, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: CREATE_ITEM,
        payload: res.data
      })
    )
};

export const markDone = (listId, todoId, checklistId, isDone) => (dispatch) => {
  axios
    .put("/api/lists/" + listId + '/todo/' + todoId + '/item/' + checklistId, {isDone: !isDone}, { withCredentials:true })
    .then((res) =>
      dispatch({
        type: STATUS_ITEM,
        payload: res.data
      })
    )
};
