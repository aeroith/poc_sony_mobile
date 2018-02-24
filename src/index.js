import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { createAppInitialState } from './store/store';
import App from './containers/App';
import siteConfig from './config/siteConfig';
import configureStore from './configureStore';
import TMBDClient from './utils/tmdb-client';

// Initiate TMDB configuration fetching
TMBDClient.getConfiguration();

// Redux-navigation configurations
const reduxNavMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);
const addListener = createReduxBoundAddListener('root');

// Initial state
const initialState = createAppInitialState(siteConfig);
console.log('initialState: ', initialState);
const { store, persistor } = configureStore(initialState, reduxNavMiddleware);

export { addListener };
export default () => {
  console.log('Sony Mobile Channel Initiated');
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
