import { NavigationActions } from 'react-navigation';
import AppNavigator from '../navigator';

const initialState = {
  index: 0,
  routes: [{ key: 'Init', routeName: 'TVGuide' }],
};

// Action reset to leave only two navigation stack
const push = (routeName, prevRouteName, params) => NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: prevRouteName || 'TVGuide' }),
    NavigationActions.navigate({ routeName, params })
  ],
});
export { initialState, push };
export default (state = initialState, action) => AppNavigator.router.getStateForAction(action, state);

