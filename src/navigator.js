import { StackNavigator } from 'react-navigation';

import Home from './containers/Home';
import Counter from './containers/Counter';
import Carousel from './containers/Carousel';

const AppNavigator = new StackNavigator(
  {
    Home: { screen: Home },
    Counter: { screen: Counter },
    Carousel: { screen: Carousel }
  },
  {
    headerMode: 'float',
    navigationOptions: {
      header: null,
    },
  },
);

export default AppNavigator;
