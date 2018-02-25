import { StackNavigator } from 'react-navigation';

import TVGuide from './screens/TvGuide';
import Programs from './screens/Programs';
import Galleries from './screens/Galleries';
import News from './screens/News';
import GamesAndMore from './screens/GamesAndMore';
import Counter from './containers/Counter';

const AppNavigator = new StackNavigator(
  {
    TVGuide: { screen: TVGuide, enum: 'tv_guide' },
    Programs: { screen: Programs, enum: 'programs' },
    Galleries: { screen: Galleries, enum: 'galleries' },
    News: { screen: News, enum: 'news' },
    GamesAndMore: { screen: GamesAndMore },
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
