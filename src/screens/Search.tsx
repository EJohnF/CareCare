import {Button} from 'react-native';
import React, {FC} from 'react';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {screenNames} from 'core/constants';
import 'core/actions/movies';
import {setFilters} from 'core/actions/movies';
import {connect} from 'react-redux';

interface Props extends NavigationComponentProps {}

const SearchScreen: FC<Props> = ({componentId}) => {
  return (
    <Button
      title="Go to details"
      onPress={() =>
        Navigation.push(componentId, {
          component: {
            name: screenNames.details, // Push the screen registered with the 'Settings' key
            options: {
              // Optional options object to configure the screen
              topBar: {
                title: {
                  text: 'Details', // Set the TopBar title of the new Screen
                },
              },
            },
          },
        })
      }
    />
  );
};

const mapState = (state) => ({
  movies: state.movies.list,
});

const mapActions = (dispatch) => ({
  search: (params) => dispatch(setFilters(params)),
});

export default connect(mapState, mapActions)(SearchScreen);
