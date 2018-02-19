import _ from 'lodash';
import { initialState as counterInitialState } from '../reducers/counter';
import { initialState as navInitialState } from '../reducers/nav';
import { initialState as carouselInitialState } from '../reducers/carousel';
import { initialState as tabbedDatePickerInitialState } from '../reducers/tabbedDatePicker';

const createAppInitialState = () => {
  const state = {
    counter: _.cloneDeep(counterInitialState),
    nav: _.cloneDeep(navInitialState),
    carousel: _.cloneDeep(carouselInitialState),
    tabbedDatePicker: _.cloneDeep(tabbedDatePickerInitialState),
  };
  return state;
};

export { createAppInitialState };
