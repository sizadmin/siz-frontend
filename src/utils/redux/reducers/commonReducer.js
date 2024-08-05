import { SET_LOADING, RESET_DATA } from '../types/CommonTypes';

const initialState = {
  loading: false,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case RESET_DATA:
      return { ...initialState };
    default:
      return state;
  }
};

export default commonReducer;
