import {
    SET_ALL_STOCKS,
} from '../constants/action_types'

const initialState = {
    stocks: []
}

function stockReducer(state = initialState, action) {
    if(action.type === SET_ALL_STOCKS) {
        return Object.assign({}, state, {
            stocks: action.payload
        })
    }
    return state
}

export default stockReducer
