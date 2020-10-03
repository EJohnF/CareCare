import React from 'react';
import {Provider} from 'react-redux';
import SearchScreen from 'screens/Search';
import DetailsScreen from 'screens/Details';
import {Navigation} from 'react-native-navigation';
import {screenNames} from 'core/constants';
import store from 'core/store';

function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

Navigation.registerComponent(screenNames.search, () =>
  WrappedComponent(SearchScreen),
);
Navigation.registerComponent(screenNames.details, () =>
  WrappedComponent(DetailsScreen),
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: screenNames.search,
              options: {
                topBar: {
                  title: {
                    text: 'Search',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
});
