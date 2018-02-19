import { combineReducers } from 'redux';
import counter from './counter';
import nav from './nav';
import search from './search';
import carousel from './carousel';
import tabbedDatePicker from './tabbedDatePicker';

export default combineReducers({
  counter,
  nav,
  search,
  carousel,
  tabbedDatePicker,
});
