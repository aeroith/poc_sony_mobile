import ApiClient from '../utils/api-client';

const actionTypes = {
  REQUEST_TV_GUIDE: 'REQUEST_TV_GUIDE',
  RECEIVE_TV_GUIDE: 'RECEIVE_TV_GUIDE',
  ERROR_TV_GUIDE: 'ERROR_TV_GUIDE',
};

const initialState = {
  guide: [],
  isLoading: false,
};

const actionsMap = {
  [actionTypes.RECEIVE_TV_GUIDE]: (state, action) =>
    ({ ...state, guide: action.guide, isLoading: false }),
  [actionTypes.REQUEST_TV_GUIDE]: state =>
    ({ ...state, isLoading: true }),
  [actionTypes.ERROR_TV_GUIDE]: (state, action) =>
    ({ ...state, error: action.error, isLoading: false }),
};

const actions = {
  getTvGuide: (timeStart, timeEnd) => (dispatch) => {
    dispatch({ type: actionTypes.REQUEST_TV_GUIDE });
    return ApiClient.get(`/guide?timeStart_gte=${timeStart}&timeStart_lte=${timeEnd}`)
      .then(response => dispatch({ type: actionTypes.RECEIVE_TV_GUIDE, guide: response.data }))
      .catch(error => dispatch({ type: actionTypes.ERROR_TV_GUIDE, error: error.request._response }));
  }
};

export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
