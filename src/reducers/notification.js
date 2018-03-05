const actionTypes = {
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  UNSET_NOTIFICATION: 'UNSET_NOTIFICATION',
};

const initialState = {
  notifications: [],
};

const actionsMap = {
  [actionTypes.SET_NOTIFICATION]: (state, action) => ({
    ...state,
    notifications: [...state.notifications, action.notification]
  }),
  [actionTypes.UNSET_NOTIFICATION]: (state, action) => ({
    ...state,
    notifications: state.notifications.filter(x => x.id !== action.id),
  })
};

const actions = {
  setNotification: notification => ({ type: actionTypes.SET_NOTIFICATION, notification }),
  unsetNotification: id => ({ type: actionTypes.UNSET_NOTIFICATION, id })
};

export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
