import '../networking';
import {
  GET_MOVIES,
  LOAD_MORE,
  LOAD_ONE,
  SELECT_ITEM,
  SET_FILTER,
} from 'core/constants';
import {request} from 'core/networking';
import {Filters} from 'types';
import {ThunkAction} from 'redux-thunk';
import {RootState} from 'core/store';
import {Action} from 'redux';

export const setFilters = (
  filters: Filters,
): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
  dispatch({
    type: SET_FILTER,
    payload: filters,
  });
  request(filters).then((res) => {
    dispatch({
      type: GET_MOVIES,
      payload: res.data.Search || [],
    });
  });
};

export const loadMoreAction = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => (dispatch, getState) => {
  request({
    ...getState().movies.filters,
    page: getState().movies.page + 1,
  }).then((res) => {
    dispatch({
      type: LOAD_MORE,
      payload: res.data.Search || [],
    });
  });
};

export const loadOneAction = (
  id: string,
): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
  dispatch({
    type: SELECT_ITEM,
    payload: id,
  });
  request({
    i: id,
  }).then((res) => {
    dispatch({
      type: LOAD_ONE,
      payload: res.data,
    });
  });
};
