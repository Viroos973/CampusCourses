import {ACTIONS} from "../actions.js";

const usersActions = (value) => {
    return {
        type: ACTIONS.GET_USERS,
        payload: value
    }
}

export default usersActions