import { combineReducers } from 'redux';
import counter from './counter';
import nav from './nav';
import search from './search';
import carousel from './carousel';

export default combineReducers({
  counter,
  nav,
  search,
  carousel,
});
