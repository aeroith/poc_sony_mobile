import FBClient from '../utils/fb-client';

const FIELDS = ['id', 'name', 'picture.height(1000)'];

const actionsTypes = {
  SET_LOGIN_STATE: 'SET_LOGIN_STATE',
  SET_PERMISSIONS: 'SET_PERMISSIONS',
  SET_PUBLIC_INFO: 'SET_PUBLIC_INFO',
  GET_PUBLIC_INFO: 'GET_PUBLIC_INFO',
  RESET_STATE: 'RESET_STATE',
};

const initialState = {
  isLoggedIn: false,
  grantedPermissions: [],
  id: '',
  name: '',
  picture: {},
};

// Reducer - User
const actionsMap = {
  [actionsTypes.SET_LOGIN_STATE]: (state, action) => ({ ...state, isLoggedIn: action.isLoggedIn }),
  [actionsTypes.SET_PERMISSIONS]: (state, action) => ({ ...state, grantedPermissions: action.grantedPermissions }),
  [actionsTypes.SET_PUBLIC_INFO]: (state, action) =>
    ({ ...state, id: action.id, name: action.name, picture: action.picture }),
  [actionsTypes.RESET_STATE]: (state) => ({ ...state, ...initialState })
};

const setLoginState = isLoggedIn => ({ type: actionsTypes.SET_LOGIN_STATE, isLoggedIn });

const setPermissions = grantedPermissions => ({ type: actionsTypes.SET_PERMISSIONS, grantedPermissions });

const getPublicInfo = () => (dispatch) => FBClient.getPublicInfo(FIELDS, (error, result) => {
  if (error) {
    console.log('Error fetching data: ' + error.toString());
  } else {
    dispatch({ type: actionsTypes.SET_PUBLIC_INFO, ...result})
  }
});

const login = permissions => dispatch => FBClient.login(permissions)
  .then(result => {
    if (result.isCancelled) {
      throw new Error('Login cancelled');
    } else {
      dispatch(setLoginState(true));
      dispatch(setPermissions(result.grantedPermissions));
    }
  });

const logout = () => (dispatch) => {
  FBClient.logout();
  dispatch(setLoginState(false));
  dispatch(resetState());
};

const resetState = () => ({ type: actionsTypes.RESET_STATE });

const actions = {
  setLoginState,
  setPermissions,
  getPublicInfo,
  login,
  logout,
};

// Exports
export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
