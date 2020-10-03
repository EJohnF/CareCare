import {Button} from 'react-native';
import * as React from 'react';
import {Navigation} from 'react-native-navigation';
import {screenNames} from 'core/constants';

export const SearchScreen = ({componentId}) => {
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
