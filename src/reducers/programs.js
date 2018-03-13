import ApiClient from '../utils/api-client';

const actionTypes = {
  SET_PROGRAM_TYPE: 'SET_PROGRAM_TYPE',
};

const initialState = {
  selectedType: 'tv',
};

const actionsMap = {
  [actionTypes.SET_PROGRAM_TYPE]: (state, action) =>
    ({ ...state, selectedType: action.selectedType })
};

const setProgramType = selectedType => ({ type: actionTypes.SET_PROGRAM_TYPE, selectedType });

const actions = {
  setProgramType,
};

export { initialState, actions, setProgramType };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
