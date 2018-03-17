import ApiClient from '../utils/api-client';

const actionTypes = {
  PROGRAM_EPISODES_REQUEST: 'PROGRAM_EPISODES_REQUEST',
  PROGRAM_EPISODES_RESPONSE: 'PROGRAM_EPISODES_RESPONSE',
  PROGRAM_EPISODES_ERROR: 'PROGRAM_EPISODES_ERROR'
};

const initialState = {
  id: null,
  loading: false,
  error: null,
};

// Reducer - SearchBar
const actionsMap = {
  [actionTypes.PROGRAM_EPISODES_REQUEST]: state => ({ ...state, loading: true, error: null }),
  [actionTypes.PROGRAM_EPISODES_RESPONSE]: (state, action) => {
    return state;
  },
  [actionTypes.PROGRAM_EPISODES_ERROR]: (state, action) => {
    return state;
  },
};

// Actions - Program
const actions = {
  getProgramWithEpisodes: programId => (dispatch, getState) => {
    const state = getState();
    const { channelId } = state.app;
    dispatch({ type: actionTypes.PROGRAM_EPISODES_REQUEST });
    ApiClient.get(`channels/${channelId}/programs/${programId}/episodes`)
      .then((response) => {
        const data = response.data.data[0];
        console.log('data: ', data);
        // dispatch({ type: actionTypes.PROGRAM_EPISODES_RESPONSE, ...data });
      })
      .catch(error => dispatch({ type: actionTypes.PROGRAM_EPISODES_ERROR, error }));
  },
};


// Exports
export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
