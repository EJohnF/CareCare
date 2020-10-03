import React, {FC} from 'react';
import {Button} from 'react-native';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';

interface Props extends NavigationComponentProps {}

export const DetailsScreen: FC<Props> = ({componentId}) => {
  return (
    <Button
      title="Go back to search"
      onPress={() => Navigation.pop(componentId)}
    />
  );
};
