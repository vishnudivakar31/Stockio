import {SET_USER_TOKEN} from '../constants/action_types'

const initialState = {
    user_token: ""
}

function rootReducer(state = initialState, action) {
    if(action.type === SET_USER_TOKEN) {
        return Object.assign({}, state, {
            user_token: action.payload
        })
    }
    return state
}

export default rootReducer
