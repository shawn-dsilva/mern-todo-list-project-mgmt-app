import {
  GET_LIST,
  GET_SINGLE_LIST,
  CREATE_LIST,
  DELETE_LIST,
  CREATE_TODO,
  DELETE_TODO
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

    case CREATE_TODO:
        return {
          ...state,
          currList: {
            ...state.currList,
            todos: [...state.currList.todos, action.payload ]
          }
        };

    case DELETE_TODO:
        return {
          ...state,
          // NEW OBJECT of currList is being returned.
          // To preserve properties of currList, current state also has to be added
          // to new currList object
          currList: { ...state.currList,
            todos: state.currList.todos.filter(todo => todo._id !== action.payload)
          }
        };

    default:
        return state;
  }

}