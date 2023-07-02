import { combineReducers } from "redux";
import user from "./userReducer";
import campaignsReducer from "./campaignsReducer";
import commonReducer from "./commonReducer";

export default combineReducers({ user, campaignsReducer, commonReducer });
