import { ApiClient } from '../utils/api-client';

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
};

// Reducer - SearchBar
const actionsMap = {
  [actionTypes.CONFIG_REQUEST]: state => ({ ...state, configLoading: true, configError: null }),
  [actionTypes.CONFIG_RESPONSE]: (state, action) => {
    const { logo, menu, connected_channels: connectedChannels } = action.channels[0];
    return {
      ...state,
      channelName: action.default_channel,
      connectedChannels,
      language: action.language,
      channelLogo: logo,
      menu,
      country: action.country,
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
  getConfig: country => (dispatch) => {
    dispatch({ type: actionTypes.CONFIG_REQUEST });
    ApiClient.get(`config?country=${country.toUpperCase()}&_embed=channels`)
      .then((response) => {
        const data = response.data[0];
        console.log('data: ', data);
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
