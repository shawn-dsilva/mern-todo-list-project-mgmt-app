import {
  GET_LIST,
  GET_SINGLE_LIST,
  CREATE_LIST,
  DELETE_LIST
} from "../actions/types";


const initialState = {
  items:[],
  currList:{},
  newList:{},
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

    case CREATE_LIST:
        return {
          ...state,
          items: [...state.items, action.payload ]
        };
    case DELETE_LIST:
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload)
        };
    default:
        return state;
  }

}