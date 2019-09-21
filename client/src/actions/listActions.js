import axios from 'axios';
import { GET_LIST, GET_SINGLE_LIST} from './types'

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
