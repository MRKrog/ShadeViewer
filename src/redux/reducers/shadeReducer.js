export const shadeReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SHADE_READY':
      return action.data;
    default:
      return state;
  }
}
