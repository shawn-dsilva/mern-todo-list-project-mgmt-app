import axios from 'axios';
import { GET_LIST } from './types'

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
