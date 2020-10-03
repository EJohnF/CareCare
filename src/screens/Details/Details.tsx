import React, {FC, useEffect} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {NavigationComponentProps} from 'react-native-navigation';
import {loadOneAction} from 'core/actions/movies';
import {connect, ConnectedProps} from 'react-redux';
import {itemSelector} from 'core/reselect';
import {Image, Text} from 'react-native-elements';
import {RootState} from 'core/store';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';

const mapState = (state: RootState) => ({
  item: itemSelector(state),
});

const mapActions = (dispatch: ThunkDispatch<RootState, void, Action>) => ({
  loadOne: (id: string) => dispatch(loadOneAction(id)),
});

export const connector = connect(mapState, mapActions);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = NavigationComponentProps &
  PropsFromRedux & {
    itemId: string;
  };

export const DetailsScreen: FC<Props> = ({loadOne, itemId, item}) => {
  useEffect(() => {
    loadOne(itemId);
  }, [itemId, loadOne]);
  return (
    <>
      {item ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
            source={{uri: item.Poster}}
          />
          <Text h3>{item.Title}</Text>
          <Text h4>Year: {item.Year}</Text>
          {item.Rated && (
            <>
              <Text>Plot: {item.Plot}</Text>
              <Text>Rated: {item.Rated}</Text>
              <Text>Released: {item.Released}</Text>
              <Text>Genre: {item.Genre}</Text>
              <Text>Director: {item.Director}</Text>
              <Text>Ratings:</Text>
              {item.Ratings &&
                item.Ratings.map((rating) => (
                  <View style={styles.rating} key={rating.Source}>
                    <Text>Source: {rating.Source}</Text>
                    <Text>Value: {rating.Value}</Text>
                  </View>
                ))}
            </>
          )}
        </ScrollView>
      ) : (
        <View style={styles.activityContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  rating: {
    flexDirection: 'row',
  },
});
