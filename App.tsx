import {SearchScreen} from 'screens/Search';
import {DetailsScreen} from 'screens/Details';
import {Navigation} from 'react-native-navigation';
import {screenNames} from 'core/constants';

Navigation.registerComponent(screenNames.search, () => SearchScreen);
Navigation.registerComponent(screenNames.details, () => DetailsScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: screenNames.search,
            },
          },
        ],
      },
    },
  });
});
