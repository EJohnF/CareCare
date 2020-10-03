import React, {FC, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationComponentProps} from 'react-native-navigation';
import {loadOneAction} from 'core/actions/movies';
import {connect} from 'react-redux';
import {itemSelector} from 'core/reselect';
import {Image, Text} from 'react-native-elements';

interface Props extends NavigationComponentProps {
  itemId: string;
  item: object;
}

const DetailsScreen: FC<Props> = (props) => {
  console.log(props);
  const {loadOne, itemId, item} = props;
  useEffect(() => {
    loadOne(itemId);
  }, []);
  return (
    <>
      {item ? (
        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 200, height: 200, resizeMode: 'contain'}}

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
              {item.Ratings.map((rating) => (
                <View style={{flexDirection: 'row'}}>
                  <Text>Source: {rating.Source}</Text>
                  <Text>Value: {rating.Value}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

const mapState = (state) => ({
  item: itemSelector(state),
});

const mapActions = (dispatch) => ({
  loadOne: (id) => dispatch(loadOneAction(id)),
});

export default connect(mapState, mapActions)(DetailsScreen);
