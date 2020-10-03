import {createSelector} from 'reselect';
import {Movie} from 'types';
import {RootState} from 'core/store';

export const moviesListSelector = (state: RootState) => state.movies.list;
export const selectedMovieIdSelector = (state: RootState) =>
  state.movies.selectedId;

export const itemSelector = createSelector(
  moviesListSelector,
  selectedMovieIdSelector,
  (list, id) => list.find((item: Movie) => item.imdbID === id),
);
