const actionsTypes = {
  SET_APP_TYPE_LOADING: 'SET_APP_TYPE_LOADING',
  SET_APP_TYPE: 'SET_APP_TYPE',
};

const initialState = {
  appTypeLoading: false,
  channelName: '',
  connectedChannels: [],
  language: '',
  country: '',
};

// Reducer - SearchBar
const actionsMap = {
  [actionsTypes.SET_APP_TYPE_LOADING]: state => ({ ...state, appTypeLoading: true }),
  [actionsTypes.SET_APP_TYPE]: (state, action) => ({
    ...state,
    channelName: action.channelName,
    language: action.language,
    country: action.country,
  }),
};

// Actions - SearchBar
const actions = {
  setAppType: country => (dispatch, getState) => {
    dispatch({ type: actionsTypes.SET_APP_TYPE_LOADING });
  },
};


// Exports
export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
