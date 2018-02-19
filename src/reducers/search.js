const actionsTypes = {
  SET_SEARCH_BAR_STATE: 'SET_SEARCH_BAR_STATE',
};

const initialState = {
  isSearchBarVisible: false,
};

// Reducer - Counter
const actionsMap = {
  [actionsTypes.SET_SEARCH_BAR_STATE]: (state, action) => ({ ...state, isSearchBarVisible: action.isSearchBarVisible }),
};

// Actions - Counter
const actions = {
  setSearchBarState: isSearchBarVisible => ({ type: actionsTypes.SET_SEARCH_BAR_STATE, isSearchBarVisible }),
};

// Exports
export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
