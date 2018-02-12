const initialState = {
  value: 0,
};

const actionsMap = {
  increment(state, action) {
    return { ...state, value: state.value + 1 };
  },
  decrement(state, action) {
    return { ...state, value: state.value - 1 };
  },
};

export { initialState };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
