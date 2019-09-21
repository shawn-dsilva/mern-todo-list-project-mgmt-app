import {
  GET_LIST,
  GET_SINGLE_LIST
} from "../actions/types";


const initialState = {
  items:[],
  currList:{},
};

export default function (state = initialState, action) {

  switch (action.type) {
    case GET_SINGLE_LIST:
      return {
        ...state,
        currList: action.payload
        };
    case GET_LIST:
      return {
        ...state,
        items: action.payload
      };

    default:
        return state;
  }

}