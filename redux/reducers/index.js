import { combineReducers } from "redux";
import authReducer from "./auth";
import globalReducer from "./global";

const rootReducer = combineReducers({auth: authReducer, global: globalReducer});

export default rootReducer;
