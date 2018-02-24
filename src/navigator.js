import { StackNavigator } from 'react-navigation';

import TVGuide from './containers/TvGuide';
import Counter from './containers/Counter';

const AppNavigator = new StackNavigator(
  {
    TVGuide: { screen: TVGuide },
    Counter: { screen: Counter },
  },
  {
    headerMode: 'float',
    navigationOptions: {
      header: null,
    },
  },
);

export default AppNavigator;
