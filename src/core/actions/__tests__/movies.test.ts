// @ts-nocheck
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import movies from '../../../../static/arrayMovies';
import {loadMoreAction, setFilters} from 'core/actions/movies';
import {GET_MOVIES, LOAD_MORE, SET_FILTER} from 'core/constants';
import mockAxios from '__mocks__/axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('set title filter to "Star" and store response from server', async () => {
  const filter = {title: 'Star'};
  const expectedActions = [
    {
      type: SET_FILTER,
      payload: filter,
    },
    {
      type: GET_MOVIES,
      payload: movies,
    },
  ];
  const store = mockStore({movies: {}});

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        Search: movies,
      },
    }),
  );

  return store.dispatch(setFilters(filter)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

it('set title filter to "asdfasdfasdfa" correctly handle no results response', async () => {
  const filter = {title: 'asdfasdfasdfa'};
  const expectedActions = [
    {
      type: SET_FILTER,
      payload: filter,
    },
    {
      type: GET_MOVIES,
      payload: [],
    },
  ];
  const store = mockStore({movies: {}});

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: 'No results',
    }),
  );

  return store.dispatch(setFilters(filter)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

it('check pagination. Initially return one page is 10 elements', async () => {
  const filter = {title: 'Star'};
  const firstActions = [
    {
      type: SET_FILTER,
      payload: filter,
    },
    {
      type: GET_MOVIES,
      payload: movies.slice(0, 10),
    },
  ];
  const nextActions = [
    {
      type: LOAD_MORE,
      payload: movies.slice(10, 20),
    },
  ];
  const store = mockStore({movies: {}});

  mockAxios.get
    .mockImplementationOnce(() => {
      Promise.resolve({
        data: {
          Search: movies.slice(0, 10),
        },
      });
    })
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          Search: movies.slice(10, 20),
        },
      }),
    );

  store.dispatch(setFilters(filter)).then(() => {
    expect(store.getActions()).toEqual(firstActions);
    store.dispatch(loadMoreAction()).then(() => {
      expect(store.getActions()).toEqual([...firstActions, ...nextActions]);
    });
  });
});
