const actionsTypes = {
  INCREMENT_COUNTER: 'INCREMENT_COUNTER',
  DECREMENT_COUNTER: 'DECREMENT_COUNTER',
};

const initialState = {
  value: 0,
};

// Reducer - Counter
const actionsMap = {
  [actionsTypes.INCREMENT_COUNTER]: (state, action) => ({ ...state, value: state.value + 1 }),
  [actionsTypes.DECREMENT_COUNTER]: (state, action) => ({ ...state, value: state.value - 1 }),
};

// Actions - Counter
const actions = {
  increment: () => ({ type: 'INCREMENT_COUNTER' }),
  decrement: () => ({ type: 'DECREMENT_COUNTER' }),
  incrementIfOdd() {
    return (dispatch, getState) => {
      const { counter } = getState();

      if (counter.value % 2 === 0) {
        return;
      }

      dispatch(actions.increment());
    };
  },
  incrementAsync(delay = 1000) {
    return (dispatch) => {
      setTimeout(() => {
        dispatch(actions.increment());
      }, delay);
    };
  }
};

// Exports
export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
