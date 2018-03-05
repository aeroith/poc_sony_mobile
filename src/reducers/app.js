import { ApiClient, ApiClientNew } from '../utils/api-client';

const actionTypes = {
  CONFIG_REQUEST: 'CONFIG_REQUEST',
  CONFIG_RESPONSE: 'CONFIG_RESPONSE',
  CONFIG_ERROR: 'CONFIG_ERROR'
};

const initialState = {
  configLoading: false,
  configError: '',
  channelName: '',
  connectedChannels: [],
  channelLogo: '',
  language: '',
  country: '',
  locale: '',
};

// Reducer - SearchBar
const actionsMap = {
  [actionTypes.CONFIG_REQUEST]: state => ({ ...state, configLoading: true, configError: null }),
  [actionTypes.CONFIG_RESPONSE]: (state, action) => {
    const { logo, menu, name } = action.channels
      .filter(channel => channel.id === action.default_channel)[0];
    const [language, country] = action.locale.split('_');
    return {
      ...state,
      channelName: name,
      connectedChannels: action.channels,
      channelLogo: logo,
      menu,
      language,
      country,
      locale: action.locale,
      configLoading: true,
      configError: null,
    };
  },
  [actionTypes.CONFIG_ERROR]: (state, action) => ({
    ...state,
    configError: action.error,
  }),
};

// Actions - SearchBar
const actions = {
  getConfig: () => (dispatch, getState) => {
    const state = getState();
    dispatch({ type: actionTypes.CONFIG_REQUEST });
    ApiClientNew.get(`countries/${state.app.locale}`)
      .then((response) => {
        const data = response.data.data[0];
        dispatch({ type: actionTypes.CONFIG_RESPONSE, ...data });
      })
      .catch(error => dispatch({ type: actionTypes.CONFIG_ERROR, error }));
  },
};


// Exports
export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
