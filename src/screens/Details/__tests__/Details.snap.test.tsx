import React from 'react';
import renderer from 'react-test-renderer';
import {DetailsScreen} from '../Details';
import movie from './static/movie';

it('renders filled', () => {
  const tree = renderer
    .create(
      <DetailsScreen
        loadOne={() => {}}
        item={movie}
        itemId={movie.imdbID}
        componentId={'component1'}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders half-empty', () => {
  const tree = renderer
    .create(
      <DetailsScreen
        loadOne={() => {}}
        item={{
          Poster: movie.Poster,
          Title: movie.Title,
          Year: movie.Year,
          imdbID: movie.imdbID,
          Type: movie.Type,
        }}
        itemId={movie.imdbID}
        componentId={'component1'}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
