import {createStore} from "redux";
import roleReducer from "./reducers/roleReducer.js";

const store = createStore(roleReducer)

export default store;