const moment = require('moment');

const actionTypes = {
  SET_TIME: 'SET_TIME',
};

const initialState = {
  timeStart: moment().unix(Number),
  timeEnd: moment().endOf('day').unix(Number)
};

const actionsMap = {
  [actionTypes.SET_TIME]: (state, action) =>
    ({ ...state, timeStart: action.timeStart, timeEnd: action.timeEnd }),
};

const actions = {
  setTime: (timeStart, timeEnd) => ({ type: actionTypes.SET_TIME, timeStart, timeEnd }),
};

export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
