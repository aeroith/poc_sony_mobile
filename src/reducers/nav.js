import { NavigationActions } from 'react-navigation';
import AppNavigator from '../navigator';

const initialState = {
  index: 0,
  routes: [{ key: 'Init', routeName: 'TVGuide' }],
};

// Action reset to leave only two navigation stack
const resetAction = (routeName, prevRouteName) => NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: prevRouteName }),
    NavigationActions.navigate({ routeName })
  ],
});
export { initialState, resetAction };
export default (state = initialState, action) => AppNavigator.router.getStateForAction(action, state);

