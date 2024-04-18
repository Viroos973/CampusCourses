import {ACTIONS} from "../actions.js";

const initialState = {
    roles: null
}

export const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ROLES:
            return { ...state, roles: action.payload}
        default:
            return state
    }
}