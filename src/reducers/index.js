import { combineReducers } from 'redux';
import counter from './counter';
import nav from './nav';
import search from './search';

export default combineReducers({
  counter,
  nav,
  search,
});
