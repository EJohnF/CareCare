import {
  GET_MOVIES,
  LOAD_MORE,
  LOAD_ONE,
  SELECT_ITEM,
  SET_FILTER,
} from 'core/constants';
import {Filters, Movie} from 'types';

const initialState: MoviesState = {
  page: 1,
  list: [],
  filters: {},
  selectedId: '',
};

export interface MoviesState {
  page: number;
  list: Movie[];
  filters: Filters;
  selectedId: string;
}

interface Action {
  type: string;
  payload: Movie[] & Filters & Movie;
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
        list: [...state.list, ...action.payload],
        page: state.page + 1,
      };
    }
    case LOAD_ONE: {
      const newArray = [...state.list];
      const index = newArray.findIndex(
        (item) => item.imdbID === action.payload.imdbID,
      );
      if (index >= 0) {
        newArray[index] = action.payload;
      }
      return {
        ...state,
        list: newArray,
      };
    }
    case SELECT_ITEM: {
      return {
        ...state,
        selectedId: action.payload,
      };
    }
    case SET_FILTER: {
      return {
        ...state,
        list: [],
        filters: action.payload,
        page: 1,
      };
    }
    default:
      return state;
  }
};
