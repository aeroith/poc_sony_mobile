import { combineReducers } from 'redux';
import counter from './counter';
import nav from './nav';
import search from './search';
import drawer from './drawer';
import carousel from './carousel';
import tabbedDatePicker from './tabbedDatePicker';
import guide from './guide';

export default combineReducers({
  counter,
  nav,
  search,
  drawer,
  carousel,
  tabbedDatePicker,
  guide,
});
