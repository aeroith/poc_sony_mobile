const actionsTypes = {
  SET_DRAWER_STATE: 'SET_DRAWER_STATE',
};

const initialState = {
  isDrawerVisible: false,
};

// Reducer - Drawer
const actionsMap = {
  [actionsTypes.SET_DRAWER_STATE]: (state, action) => ({ ...state, isDrawerVisible: action.isDrawerVisible }),
};

// Actions - Drawer
const actions = {
  setDrawerState: isDrawerVisible => ({ type: actionsTypes.SET_DRAWER_STATE, isDrawerVisible }),
};

// Exports
export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
