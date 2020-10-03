import React from 'react';
import renderer from 'react-test-renderer';
import {SearchScreen} from '../Search';
import movies from '../../../../static/arrayMovies';

it('renders fullList', () => {
  const tree = renderer
    .create(
      <SearchScreen
        movies={movies}
        loadMore={() => {}}
        search={() => {}}
        filters={{title: 'Star'}}
        componentId={'component1'}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders empty', () => {
  const tree = renderer
    .create(
      <SearchScreen
        movies={[]}
        loadMore={() => {}}
        search={() => {}}
        filters={{}}
        componentId={'component1'}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
