import {
    SET_TOP_VOLUME_STOCKS,
    SET_RATES_CHART,
    SET_RATES_VARIATION
} from '../constants/action_types'

const initialState = {
    topVolumeStocks: [],
    ratesChartData: [],
    rateVarianceData: []
}

function chartReducer(state = initialState, action) {
    if(action.type === SET_TOP_VOLUME_STOCKS) {
        return Object.assign({}, state, {
            topVolumeStocks: action.payload
        })
    } else if(action.type === SET_RATES_CHART) {
        return Object.assign({}, state, {
            ratesChartData: action.payload
        })
    } else if(action.type === SET_RATES_VARIATION) {
        return Object.assign({}, state, {
            rateVarianceData: action.payload
        })
    }
    return state
}

export default chartReducer
