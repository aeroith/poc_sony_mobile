import ApiClient from '../utils/api-client';
import TMDBClient from '../utils/tmdb-client';

const actionTypes = {
  PROGRAM_EPISODES_REQUEST: 'PROGRAM_EPISODES_REQUEST',
  PROGRAM_EPISODES_RESPONSE: 'PROGRAM_EPISODES_RESPONSE',
  PROGRAM_EPISODES_ERROR: 'PROGRAM_EPISODES_ERROR',
  RESET_PROGRAM: 'RESET_PROGRAM',
};

const initialState = {
  details: null,
  tmdbDetails: null,
  loading: false,
  error: null,
};

// Reducer - SearchBar
const actionsMap = {
  [actionTypes.PROGRAM_EPISODES_REQUEST]: state => ({ ...state, loading: true, error: null }),
  [actionTypes.PROGRAM_EPISODES_RESPONSE]: (state, { details, tmdbDetails }) => ({
    ...state,
    details,
    tmdbDetails,
    loading: false,
    error: null
  }),
  [actionTypes.PROGRAM_EPISODES_ERROR]: (state, action) => ({
    ...state, error: action.error, loading: false, details: null, tmdbDetails: null
  }),
  [actionTypes.RESET_PROGRAM]: state => ({
    ...state, details: null, tmdbDetails: null, loading: false, error: null
  })
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
            resolve({ tmdbDetails, details: { seasons: fetchedData.seasons, ...fetchedData.program } });
          })
          .catch(() => {
            resolve({ details: response.data.data });
          });
      })
      .catch(error => reject(error)));
    getProgramWithEpisodes
      .then(({ details, tmdbDetails }) => {
        dispatch({
          type: actionTypes.PROGRAM_EPISODES_RESPONSE,
          details,
          tmdbDetails: {
            ...tmdbDetails,
            full_poster_path: TMDBClient.generatePosterPath(tmdbDetails, 'w154'),
            date_range: TMDBClient.getDateRange(tmdbDetails),
          }
        });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.PROGRAM_EPISODES_ERROR, error });
      });
  },
  resetProgram: () => ({
    type: actionTypes.RESET_PROGRAM,
  }),
};


// Exports
export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
