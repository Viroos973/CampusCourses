import {combineReducers} from "redux";
import {roleReducer} from "./roleReducer.js";
import {usersReducer} from "./usersReducer.js";

export const rootReducer = combineReducers({
    roles: roleReducer,
    users: usersReducer
})