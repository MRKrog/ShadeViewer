export const variantReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_VARIANT':
      return action.variant;
    default:
      return state;
  }
}
