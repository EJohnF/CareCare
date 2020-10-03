import React, {FC, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {screenNames} from 'core/constants';
import 'core/actions/movies';
import {loadMoreAction, setFilters} from 'core/actions/movies';
import {connect} from 'react-redux';
import {Input, Button, ListItem, Avatar} from 'react-native-elements';
import { moviesListSelector } from 'core/reselect'

interface SearchFunc {
  (title: string): void;
}

interface Props extends NavigationComponentProps {
  search: SearchFunc;
}

const SearchScreen: FC<Props> = ({componentId, search, movies, loadMore}) => {
  console.log(movies);
  const [title, setTitle] = useState('Star');
  const openDetails = (item) => {
    console.log('openDetails', item)
    Navigation.push(componentId, {
      component: {
        name: screenNames.details, // Push the screen registered with the 'Settings' key
        passProps: {
          itemId: item.imdbID,
        },
        options: {
          // Optional options object to configure the screen
          topBar: {
            title: {
              text: 'Details', // Set the TopBar title of the new Screen,
            },
          },
        },
      },
    });
  };
  return (
    <>
      <View style={{flex: 1, marginHorizontal: 16}}>
        <Input
          placeholder={'Movie Title'}
          onChangeText={(text) => setTitle(text)}
        />
        <Button title={'Search'} onPress={() => search({s: title})} />
        {movies.length > 0 && (
          <FlatList
            data={movies}
            onEndReached={loadMore}
            keyExtractor={(item) => item.imdbID}
            renderItem={({item}) => (
              <ListItem bottomDivider onPress={() => openDetails(item)}>
                <Avatar source={{uri: item.Poster}} />
                <ListItem.Content>
                  <ListItem.Title>{item.Title}</ListItem.Title>
                  <ListItem.Subtitle>{`${item.Type} ${item.Year}`}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            )}
          />
        )}
      </View>
    </>
  );
};

const mapState = (state) => ({
  movies: moviesListSelector(state),
});

const mapActions = (dispatch) => ({
  search: (params) => dispatch(setFilters(params)),
  loadMore: () => dispatch(loadMoreAction()),
});

export default connect(mapState, mapActions)(SearchScreen);
