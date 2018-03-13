import ApiClient from '../utils/api-client';

const actionTypes = {
  SET_PROGRAM_TYPE: 'SET_PROGRAM_TYPE',
  REQUEST_PROGRAMS: 'REQUEST_PROGRAMS',
  RECEIVE_PROGRAMS: 'RECEIVE_PROGRAMS',
  ERROR_PROGRAMS: 'ERROR_PROGRAMS',
};

const initialState = {
  selectedType: 'tv',
  programs: [],
};

const actionsMap = {
  [actionTypes.SET_PROGRAM_TYPE]: (state, action) =>
    ({ ...state, selectedType: action.selectedType }),
  [actionTypes.REQUEST_PROGRAMS]: state =>
    ({ ...state, isLoading: true }),
  [actionTypes.RECEIVE_PROGRAMS]: (state, action) =>
    ({ ...state, isLoading: false, programs: action.programs}),
  [actionTypes.ERROR_PROGRAMS]: (state, action) =>
    ({ ...state, error: action.error, isLoading: false })
};

const setProgramType = selectedType => ({ type: actionTypes.SET_PROGRAM_TYPE, selectedType });

const getPrograms = channelId => (dispatch) => {
  dispatch({ type: actionTypes.REQUEST_PROGRAMS });
  return ApiClient.get(`/channels/${channelId}/programs`)
    .then(response => dispatch({ type: actionTypes.RECEIVE_PROGRAMS, programs: response.data.data }))
    .catch(error => dispatch({ type: actionTypes.ERROR_PROGRAMS, error: error.request._response }));
};

const actions = {
  setProgramType,
  getPrograms
};

export { initialState, actions, setProgramType, getPrograms };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
