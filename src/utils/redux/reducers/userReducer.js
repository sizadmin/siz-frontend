/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  userInfo: {},
  token: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "RESET_USER":
      return { ...initialState };
    case "SET_PROFILE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
