import { combineReducers } from 'redux';
import counter from './counter';
import nav from './nav';
import carousel from './carousel';

export default combineReducers({
  counter,
  nav,
  carousel,
});
