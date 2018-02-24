import _ from 'lodash';
import { initialState as counterInitialState } from '../reducers/counter';
import { initialState as navInitialState } from '../reducers/nav';
import { initialState as carouselInitialState } from '../reducers/carousel';
import { initialState as tabbedDatePickerInitialState } from '../reducers/tabbedDatePicker';
import { initialState as guideInitialState } from '../reducers/guide';

const createAppInitialState = () => {
  const state = {
    counter: _.cloneDeep(counterInitialState),
    nav: _.cloneDeep(navInitialState),
    carousel: _.cloneDeep(carouselInitialState),
    tabbedDatePicker: _.cloneDeep(tabbedDatePickerInitialState),
    guide: _.cloneDeep(guideInitialState),
  };
  return state;
};

export { createAppInitialState };
