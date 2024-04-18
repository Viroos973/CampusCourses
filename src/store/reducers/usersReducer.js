import {ACTIONS} from "../actions.js";

const initialState = {
    users: null
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_USERS:
            return { ...state, users: action.payload}
        default:
            return state
    }
}