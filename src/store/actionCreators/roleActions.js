import {ACTIONS} from "../actions.js";

const roleActions = (value) => {
    return {
        type: ACTIONS.GET_ROLES,
        payload: value
    }
}

export default roleActions