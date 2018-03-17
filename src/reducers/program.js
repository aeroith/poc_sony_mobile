import ApiClient from '../utils/api-client';
import TMDBClient from '../utils/tmdb-client';

const actionTypes = {
  PROGRAM_EPISODES_REQUEST: 'PROGRAM_EPISODES_REQUEST',
  PROGRAM_EPISODES_RESPONSE: 'PROGRAM_EPISODES_RESPONSE',
  PROGRAM_EPISODES_ERROR: 'PROGRAM_EPISODES_ERROR'
};

const initialState = {
  programDetails: {},
  tmdbDetails: {},
  loading: false,
  error: null,
};

// Reducer - SearchBar
const actionsMap = {
  [actionTypes.PROGRAM_EPISODES_REQUEST]: state => ({ ...state, loading: true, error: null }),
  [actionTypes.PROGRAM_EPISODES_RESPONSE]: (state, { programDetails, tmdbDetails }) => ({
    ...state,
    programDetails,
    tmdbDetails,
    loading: false,
    error: null
  }),
  [actionTypes.PROGRAM_EPISODES_ERROR]: (state, action) => ({ ...state, error: action.error, loading: false, programDetails: {}, tmdbDetails: {} }),
};

// Actions - Program
const actions = {
  getProgramWithEpisodes: programId => (dispatch, getState) => {
    const state = getState();
    const { channelId } = state.app;
    dispatch({ type: actionTypes.PROGRAM_EPISODES_REQUEST });
    const getProgramWithEpisodes = new Promise((resolve, reject) => ApiClient.get(`channels/${channelId}/programs/${programId}/episodes`)
      .then((response) => {
        const { tmdb_id: tmdbId, type } = response.data.data.program;
        return TMDBClient.get('Details', type, tmdbId)
          .then((tmdbDetails) => {
            const fetchedData = response.data.data;
            resolve({ tmdbDetails, programDetails: { seasons: fetchedData.seasons, ...fetchedData.program } });
          })
          .catch(() => {
            resolve({ programDetails: response.data.data });
          });
      })
      .catch(error => reject(error)));
    getProgramWithEpisodes
      .then(({ programDetails, tmdbDetails }) => {
        dispatch({ type: actionTypes.PROGRAM_EPISODES_RESPONSE, programDetails, tmdbDetails });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.PROGRAM_EPISODES_ERROR, error });
      });
  },
};


// Exports
export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
