import axios from 'axios';
import { GET_LIST, GET_SINGLE_LIST, CREATE_LIST, DELETE_LIST } from './types'

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
        payload: res.data
      })
    )
};