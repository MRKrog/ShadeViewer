export const engineReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ENGINE':
      return action.engine;
    default:
      return state;
  }
}
