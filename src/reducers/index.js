import { combineReducers } from 'redux';
import app from './app';
import user from './user';
import counter from './counter';
import nav from './nav';
import search from './search';
import drawer from './drawer';
import carousel from './carousel';
import tabbedDatePicker from './tabbedDatePicker';
import guide from './guide';
import notification from './notification';
import programs from './programs';
import program from './program';

export default combineReducers({
  app,
  user,
  counter,
  nav,
  search,
  drawer,
  carousel,
  tabbedDatePicker,
  guide,
  notification,
  programs,
  program,
});
