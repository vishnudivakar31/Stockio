import {
    SET_USER_TOKEN,
    LOGIN_ERROR,
    SET_USER
} from '../constants/action_types'

const initialState = {
    user_token: "",
    login_error: "",
    user: {}
}

function rootReducer(state = initialState, action) {
    if(action.type === SET_USER_TOKEN) {
        return Object.assign({}, state, {
            user_token: action.payload
        })
    } else if (action.type === LOGIN_ERROR) {
        return Object.assign({}, state, {
            login_error: action.payload
        })
    } else if (action.type === SET_USER) {
        return Object.assign({}, state, {
            user: action.payload
        })
    }
    return state
}

export default rootReducer
