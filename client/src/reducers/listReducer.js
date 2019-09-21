import {
  GET_LIST,
  GET_SINGLE_LIST
} from "../actions/types";


const initialState = {
  items:[],
};

export default function (state = initialState, action) {

  switch (action.type) {
    case GET_SINGLE_LIST:
    case GET_LIST:
      return {
        ...state,
        items: action.payload
      };

    default:
        return state;
  }

}