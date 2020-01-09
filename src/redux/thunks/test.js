import * as actions from '../actions/index';

export const testThunk = () => {
  return async (dispatch) => {
    dispatch(actions.setLoading(true));
    try {
      const response = await fetch('url', 'options')
      const data = await response.json()
    } catch(error) {
      console.log('error', error);
    } finally {
      
    }
  }
}
