import { StackNavigator } from 'react-navigation';

import TVGuide from './containers/TvGuide';
import Programs from './containers/Programs';
import Galleries from './containers/Galleries';
import News from './containers/News';
import GamesAndMore from './containers/GamesAndMore';
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
