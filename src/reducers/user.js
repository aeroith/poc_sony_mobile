const actionsTypes = {
  SET_LOGIN_STATE: 'SET_LOGIN_STATE',
};

const initialState = {
  isLoggedIn: false,
  fbUsername: '',
  fbImageUri: '',
};

// Reducer - User
const actionsMap = {
  [actionsTypes.SET_LOGIN_STATE]: (state, action) => ({ ...state, isLoggedIn: action.isLoggedIn }),
};

// Actions - Drawer
const actions = {
  setLoginState: isLoggedIn => ({ type: actionsTypes.SET_LOGIN_STATE, isLoggedIn }),
};

// Exports
export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
