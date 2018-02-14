import config from '../config/config';

const actionTypes = {
  REQUEST_FEATURED_PHOTOS: 'REQUEST_FEATURED_PHOTOS',
  RECEIVE_FEATURED_PHOTOS: 'RECEIVE_FEATURED_PHOTOS',
  ERROR_FEATURED_PHOTOS: 'ERROR_FEATURED_PHOTOS',
};

const initialState = {
  images: [],
  isLoading: false,
};

const actionsMap = {
  [actionTypes.RECEIVE_FEATURED_PHOTOS]: (state, action) =>
    ({ ...state, images: action.images, isLoading: false }),
  [actionTypes.REQUEST_FEATURED_PHOTOS]: state => ({ ...state, isLoading: true }),
  [actionTypes.ERROR_FEATURED_PHOTOS]: (state, action) => ({ ...state, error: action.error })
};

const actions = {
  getFeaturedPhotos: () => (dispatch) => {
    dispatch({ type: actionTypes.REQUEST_FEATURED_PHOTOS });
    return fetch(`${config.apiUrl}/content?featured=true`)
      .then(response => response.json())
      .then(images => dispatch({ type: actionTypes.RECEIVE_FEATURED_PHOTOS, images }))
      .catch((error) => {
        console.log(error);
        return dispatch({ type: actionTypes.ERROR_FEATURED_PHOTOS, error });
      });
  }
};

export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
