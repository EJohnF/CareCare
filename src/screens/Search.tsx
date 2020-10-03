import React, {FC, useState, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {screenNames} from 'core/constants';
import 'core/actions/movies';
import {loadMoreAction, setFilters} from 'core/actions/movies';
import {connect, ConnectedProps} from 'react-redux';
import {Input, Button, ListItem, Avatar, Text} from 'react-native-elements';
import {moviesListSelector} from 'core/reselect';
import {RootState} from 'core/store';
import {Filters, Movie} from 'types';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';

const mapState = (state: RootState) => ({
  movies: moviesListSelector(state),
  filters: state.movies.filters,
});

const mapActions = (dispatch: ThunkDispatch<RootState, void, Action>) => ({
  search: (params: Filters) => dispatch(setFilters(params)),
  loadMore: () => dispatch(loadMoreAction()),
});

const connector = connect(mapState, mapActions);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = NavigationComponentProps & PropsFromRedux;

const SearchScreen: FC<Props> = ({componentId, search, movies, loadMore, filters}) => {
  const [title, setTitle] = useState('Star');
  const openDetails = useCallback(
    (item: Movie) => {
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
    },
    [componentId],
  );
  return (
    <View style={styles.container}>
      <Input
        placeholder={'Movie Title'}
        onChangeText={(text) => setTitle(text)}
      />
      <Button title={'Search'} onPress={() => search({title})} />
      {filters.title && (
        <FlatList
          data={movies}
          onEndReached={loadMore}
          ListEmptyComponent={<Text>No results</Text>}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default connector(SearchScreen);
