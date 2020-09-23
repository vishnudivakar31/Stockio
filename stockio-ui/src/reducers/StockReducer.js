import {
    SET_ALL_STOCKS,
    SAVE_MY_STOCKS,
    SET_CURRENT_RATE
} from '../constants/action_types'

const initialState = {
    stocks: [],
    myStocks: [],
    currentRate: []
}

function stockReducer(state = initialState, action) {
    if(action.type === SET_ALL_STOCKS) {
        return Object.assign({}, state, {
            stocks: action.payload
        })
    } else if(action.type === SAVE_MY_STOCKS) {
        return Object.assign({}, state, {
            myStocks: action.payload
        })
    } else if (action.type === SET_CURRENT_RATE) {
        return Object.assign({}, state, {
            currentRate: action.payload
        })
    }
    return state
}

export default stockReducer
