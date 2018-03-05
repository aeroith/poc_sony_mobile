import { ApiClient } from '../utils/api-client';

const actionTypes = {
  REQUEST_FEATURED_PHOTOS: 'REQUEST_FEATURED_PHOTOS',
  RECEIVE_FEATURED_PHOTOS: 'RECEIVE_FEATURED_PHOTOS',
  ERROR_FEATURED_PHOTOS: 'ERROR_FEATURED_PHOTOS',
  SET_CAROUSEL_PAGE: 'SET_CAROUSEL_PAGE',
  RESET_CAROUSEL: 'RESET_CAROUSEL'
};

const initialState = {
  images: [],
  isLoading: false,
  page: 0,
};

const actionsMap = {
  [actionTypes.RECEIVE_FEATURED_PHOTOS]: (state, action) =>
    ({ ...state, images: action.images, isLoading: false }),
  [actionTypes.REQUEST_FEATURED_PHOTOS]: state => ({ ...state, isLoading: true }),
  [actionTypes.ERROR_FEATURED_PHOTOS]: (state, action) => ({ ...state, error: action.error, isLoading: false }),
  [actionTypes.SET_CAROUSEL_PAGE]: (state, action) => ({ ...state, page: action.page }),
  [actionTypes.RESET_CAROUSEL]: (state) => ({ ...state, ...initialState }),
};

const actions = {
  getFeaturedPhotos: () => (dispatch) => {
    dispatch({ type: actionTypes.REQUEST_FEATURED_PHOTOS });
    return ApiClient.get('/content?featured=true&_sort=id&_order=desc&_limit=5')
      .then(response => dispatch({ type: actionTypes.RECEIVE_FEATURED_PHOTOS, images: response.data }))
      .catch(error => dispatch({ type: actionTypes.ERROR_FEATURED_PHOTOS, error: error.request._response }));
  },
  setCarouselPage: page => ({ type: actionTypes.SET_CAROUSEL_PAGE, page }),
  resetCarousel: () => ({ type: actionTypes.RESET_CAROUSEL }),
};

export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
