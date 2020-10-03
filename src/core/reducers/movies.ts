import {GET_MOVIES, LOAD_MORE, SET_FILTER} from 'core/constants';

const initialState = {
  page: 1,
  list: [],
  filters: {},
};

interface Action {
  type: string;
  payload: any;
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        list: action.payload,
      };
    case LOAD_MORE: {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    }
    case SET_FILTER: {
      return {
        ...state,
        list: [],
        filters: action.payload,
      };
    }
    default:
      return state;
  }
};
