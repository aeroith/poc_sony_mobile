import { StackNavigator } from 'react-navigation';

import TVGuide from './screens/TvGuide';
import Programs from './screens/Programs';
import Program from './screens/Program';
import Galleries from './screens/Galleries';
import News from './screens/News';
import GamesAndMore from './screens/GamesAndMore';
import Settings from './screens/Settings';
import Notifications from './screens/Notifications';
import Counter from './containers/Counter';

const AppNavigator = new StackNavigator(
  {
    TVGuide: { screen: TVGuide },
    Programs: { screen: Programs },
    Program: { screen: Program },
    Galleries: { screen: Galleries },
    News: { screen: News },
    GamesAndMore: { screen: GamesAndMore },
    Settings: { screen: Settings },
    Notifications: { screen: Notifications },
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
