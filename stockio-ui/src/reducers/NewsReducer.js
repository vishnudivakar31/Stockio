import {
    SET_NEWS
} from '../constants/action_types'

const getDateAndTime = () => {
    let now = new Date()
    return `${now.toLocaleDateString()} on ${now.toLocaleTimeString()}`
}

const initialState = {
    news: [],
    lastUpdated: getDateAndTime()
}

function newsReducer(state = initialState, action) {
    if(action.type === SET_NEWS) {
        return Object.assign({}, state, {
            news: action.payload,
            lastUpdated: getDateAndTime()
        })
    }
    return state
}

export default newsReducer
