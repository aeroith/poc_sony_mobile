import AppNavigator from '../navigator';

const initialState = {
  index: 0,
  routes: [{ key: 'Init', routeName: 'Home' }],
};

export { initialState };
export default (state = initialState, action) =>
  AppNavigator.router.getStateForAction(action, state);
