import React from 'react';
import { Provider } from 'react-redux';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { createAppInitialState } from './store/store';
import AppWithNavigationState from './containers/AppWithNavigationState';
import configureStore from './configureStore';

// Redux-navigation configurations
const reduxNavMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);
const addListener = createReduxBoundAddListener('root');

// Initial state
const initialState = createAppInitialState();
const store = configureStore(initialState, reduxNavMiddleware);

export { addListener };
export default () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);
