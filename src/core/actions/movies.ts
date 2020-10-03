import '../networking';
import {GET_MOVIES, SET_FILTER} from 'core/constants';
import {request} from 'core/networking';

interface Filters {
  s: string;
  type: 'movie' | 'series' | 'episode';
  y: number;
}

export const setFilters = (filters: Filters) => (dispatch: Function) => {
  dispatch({
    type: SET_FILTER,
    payload: filters,
  });
  request(filters).then((res) => {
    console.log(res.data);
    dispatch({
      type: GET_MOVIES,
      payload: res.data,
    });
  });
};
