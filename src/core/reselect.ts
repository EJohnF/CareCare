import {createSelector} from 'reselect';

export const moviesListSelector = (state) => state.movies.list;
export const selectedMovieIdSelector = (state) => state.movies.selectedId;

export const itemSelector = createSelector(
  moviesListSelector,
  selectedMovieIdSelector,
  (list, id) => list.find((item) => item.imdbID === id),
);
