import ApiClient from '../utils/api-client';

const actionTypes = {
  CONFIG_REQUEST: 'CONFIG_REQUEST',
  CONFIG_RESPONSE: 'CONFIG_RESPONSE',
  CONFIG_ERROR: 'CONFIG_ERROR'
};

const initialState = {
  configLoading: false,
  configError: null,
  channelName: '',
  connectedChannels: [],
  language: '',
  country: '',
};

// Reducer - SearchBar
const actionsMap = {
  [actionTypes.CONFIG_REQUEST]: state => ({ ...state, configLoading: true, configError: null }),
  [actionTypes.CONFIG_RESPONSE]: (state, action) => ({
    ...state,
    channelName: action.default_channel,
    language: action.language,
    country: action.country,
    configLoading: false,
    configError: null,
  }),
  [actionTypes.CONFIG_ERROR]: (state, action) => ({
    ...state,
    error: action.error,
  }),
};

// Actions - SearchBar
const actions = {
  getConfig: country => (dispatch, getState) => {
    dispatch({ type: actionTypes.CONFIG_REQUEST });
    ApiClient.get(`config/?country=${country.toUpperCase()}`)
      .then(response => dispatch({ type: actionTypes.CONFIG_RESPONSE, ...response }))
      .catch(error => dispatch({ type: actionTypes.CONFIG_ERROR, error: error.request._response }));
  },
};


// Exports
export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
