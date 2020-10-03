import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {MoviesState} from 'core/reducers/movies';

export default createStore(rootReducer, applyMiddleware(thunk));

export interface RootState {
  movies: MoviesState;
}
