import _cloneDeep from 'lodash/cloneDeep';
import { initialState as appInitialState } from '../reducers/app';
import { initialState as counterInitialState } from '../reducers/counter';
import { initialState as navInitialState } from '../reducers/nav';
import { initialState as searchInitialState } from '../reducers/search';
import { initialState as drawerInitialState } from '../reducers/drawer';
import { initialState as carouselInitialState } from '../reducers/carousel';
import { initialState as tabbedDatePickerInitialState } from '../reducers/tabbedDatePicker';
import { initialState as guideInitialState } from '../reducers/guide';

const createAppInitialState = (siteConfig, deviceInfo) => {
  const state = {
    app: _cloneDeep(appInitialState),
    counter: _cloneDeep(counterInitialState),
    nav: _cloneDeep(navInitialState),
    search: _cloneDeep(searchInitialState),
    drawer: _cloneDeep(drawerInitialState),
    carousel: _cloneDeep(carouselInitialState),
    tabbedDatePicker: _cloneDeep(tabbedDatePickerInitialState),
    guide: _cloneDeep(guideInitialState),
  };

  if (deviceInfo.country) state.app.country = deviceInfo.country;
  if (deviceInfo.language) state.app.language = deviceInfo.language;
  if (deviceInfo.locale) state.app.locale = deviceInfo.locale;

  return state;
};

export { createAppInitialState };
