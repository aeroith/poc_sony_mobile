import { combineReducers } from 'redux';
import app from './app';
import counter from './counter';
import nav from './nav';
import search from './search';
import drawer from './drawer';
import carousel from './carousel';
import tabbedDatePicker from './tabbedDatePicker';
import guide from './guide';
import notification from './notification';

export default combineReducers({
  app,
  counter,
  nav,
  search,
  drawer,
  carousel,
  tabbedDatePicker,
  guide,
  notification,
});
