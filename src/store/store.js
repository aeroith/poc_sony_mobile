import _ from 'lodash';
import { counterInitialState } from '../reducers/counter';
import { navInitialState } from '../reducers/nav';
import { carouselInitialState } from '../reducers/carousel';

const createAppInitialState = () => {
  const state = {
    counter: _.cloneDeep(counterInitialState),
    nav: _.cloneDeep(navInitialState),
    carousel: _.cloneDeep(carouselInitialState),
  };
  return state;
};

export { createAppInitialState };
