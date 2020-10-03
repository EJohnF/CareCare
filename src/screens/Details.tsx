import * as React from 'react';
import {Button} from 'react-native';
import {Navigation} from 'react-native-navigation';

export const DetailsScreen = ({componentId}) => {
  return (
    <Button
      title="Go back to search"
      onPress={() => Navigation.pop(componentId)}
    />
  );
};
