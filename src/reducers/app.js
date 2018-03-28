import ApiClient from '../utils/api-client';

const actionTypes = {
  CONFIG_REQUEST: 'CONFIG_REQUEST',
  CONFIG_RESPONSE: 'CONFIG_RESPONSE',
  CONFIG_ERROR: 'CONFIG_ERROR',
  TOGGLE_TOP_BAR: 'TOGGLE_TOP_BAR',
};

const initialState = {
  configLoading: true,
  configError: '',
  channelName: '',
  connectedChannels: [],
  channelLogo: '',
  language: '',
  country: '',
  locale: '',
  systemName: 'ios',
  systemVersion: '',
  topBarHidden: false,
  liveUrl: '',
  posterImage: '',
};

// Reducer - SearchBar
const actionsMap = {
  [actionTypes.CONFIG_REQUEST]: state => ({ ...state, configLoading: true, configError: null }),
  [actionTypes.CONFIG_RESPONSE]: (state, action) => {
    const {
      logo, menu, name, live_url, poster_image, id
    } = action.channels
      .filter(channel => channel.id === action.default_channel)[0];
    const [language, country] = action.locale.split('_');
    return {
      ...state,
      channelId: id,
      channelName: name,
      connectedChannels: action.channels,
      channelLogo: logo,
      menu,
      language,
      country,
      locale: action.locale,
      configLoading: false,
      configError: null,
      liveUrl: live_url,
      posterImage: poster_image,
    };
  },
  [actionTypes.CONFIG_ERROR]: (state, action) => ({
    ...state,
    configError: action.error,
  }),
  [actionTypes.TOGGLE_TOP_BAR]: state => ({
    ...state,
    topBarHidden: !state.topBarHidden,
  }),
};

// Actions - SearchBar
const actions = {
  getConfig: () => (dispatch, getState) => {
    const state = getState();
    dispatch({ type: actionTypes.CONFIG_REQUEST });
    ApiClient.get(`countries/${state.app.locale}`)
      .then((response) => {
        const data = response.data.data[0];
        dispatch({ type: actionTypes.CONFIG_RESPONSE, ...data });
      })
      .catch(error => dispatch({ type: actionTypes.CONFIG_ERROR, error }));
  },
  toggleTopBar: () => ({ type: actionTypes.TOGGLE_TOP_BAR })
};


// Exports
export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
