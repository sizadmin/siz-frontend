import { combineReducers } from "redux";
import user from "./userReducer";
import commonReducer from "./commonReducer";

export default combineReducers({ user, commonReducer });
