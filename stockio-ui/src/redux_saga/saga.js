import {
    call,
    put,
    takeEvery,
    select
} from 'redux-saga/effects'

import Api from '../Api'

import {
    SET_USER_TOKEN,
    LOGIN,
    LOGIN_ERROR,
    SET_USER,
    SIGNUP,
    FETCH_ALL_STOCKS,
    SET_ALL_STOCKS,
    FETCH_NEWS,
    SET_NEWS,
    SEATCH_STOCK,
    SAVE_MY_STOCKS,
    FETCH_MY_STOCKS,
    SEARCH_MY_STOCKS,
    DELETE_MY_STOCKS,
    FETCH_CURRENT_RATE,
    SET_CURRENT_RATE,
    COMPUTE_TOP_VOLUME_STOCKS,
    SET_TOP_VOLUME_STOCKS,
    COMPUTE_RATES_CHART,
    SET_RATES_CHART,
    COMPUTE_RATES_VARIATION,
    SET_RATES_VARIATION
} from '../constants/action_types'

const getMyStocks = state => state.stockReducer.myStocks
const getCurrentRateFromState = state => state.stockReducer.currentRate

function* loginToStockio(action) {
    try {
        const response = yield call(Api.loginWithCredentials, action.payload)
        yield put({type: SET_USER_TOKEN, payload: response.token})
        yield put({type: SET_USER, payload: response.user})
        yield put({type: LOGIN_ERROR, payload: ""})
    } catch (e) {
        yield put({type: LOGIN_ERROR, payload: e.messages})
    }
}

function* signUpToStockio(action) {
    try {
        const response = yield call(Api.signupToStockio, action.payload)
        yield put({type: SET_USER_TOKEN, payload: response.token})
        yield put({type: SET_USER, payload: response.user})
        yield put({type: LOGIN_ERROR, payload: ""})
    } catch(e) {
        yield put({type: LOGIN_ERROR, payload: e.messages})
    }
}

function* fetchAllStocks(token) {
    try {
        const my_stocks = yield call(Api.getMyStocks, token)
        const stocks = yield call(Api.fetchAllStocks, token)
        if(stocks.data) {
            stocks.data = stocks.data.filter(stock => !my_stocks.map(item => item['symbol']).includes(stock.symbol))
        }
        yield put({type: SET_ALL_STOCKS, payload: stocks})
    } catch(e) {
        if(e === 'unauthorized') {
            yield put({type: SET_USER_TOKEN, payload: ""})
            yield put({type: SET_USER, payload: {}})
        }
    }
}

function* fetchMyStocks(token) {
    try {
        const my_stocks = yield call(Api.getMyStocks, token)
        yield put({type: SAVE_MY_STOCKS, payload: my_stocks})
    } catch(e) {
        if(e === 'unauthorized') {
            yield put({type: SET_USER_TOKEN, payload: ""})
            yield put({type: SET_USER, payload: {}})
        }
    }
}

function* searchStocks(payload) {
    try {
        const stocks = yield call(Api.searchStocks, payload)
        yield put({type: SET_ALL_STOCKS, payload: stocks})
    } catch(e) {
        if(e === 'unauthorized') {
            yield put({type: SET_USER_TOKEN, payload: ""})
            yield put({type: SET_USER, payload: {}})
        }
    }
}

function* savemyStocks(payload) {
    try {
        const stocks = yield call(Api.saveMyStocks, payload)
        yield put({type: SAVE_MY_STOCKS, payload: stocks})
    } catch(e) {
        if(e === 'unauthorized') {
            yield put({type: SET_USER_TOKEN, payload: ""})
            yield put({type: SET_USER, payload: {}})
        }
    }
}

function* deleteMyStocks(action) {
    try {
        const stocks = yield call(Api.deleteMyStocks, action)
        yield put({type: SAVE_MY_STOCKS, payload: stocks})
    } catch(e) {
        if(e === 'unauthorized') {
            yield put({type: SET_USER_TOKEN, payload: ""})
            yield put({type: SET_USER, payload: {}})
        }
    }
}

function* searchMyStocks(action) {
    try {
        let searchText = action.payload.searchText.toLowerCase()
        let my_stocks = yield call(Api.getMyStocks, { payload: action.payload.user_token})
        my_stocks = my_stocks.filter(stock => stock.name.toLowerCase().startsWith(searchText))
        yield put({type: SAVE_MY_STOCKS, payload: my_stocks})
    } catch(e) {
        if(e === 'unauthorized') {
            yield put({type: SET_USER_TOKEN, payload: ""})
            yield put({type: SET_USER, payload: {}})
        }
    }
}

function* getCurrentRate(payload) {
    try {
        let currentRate = yield call(Api.getCurrentRate, payload)
        const myStocks = yield select(getMyStocks)
        currentRate.map(rate => {
            let stock = myStocks.find(item => item.symbol === rate.symbol)
            rate.name = stock.name
            return rate
        })
        yield put({type: SET_CURRENT_RATE, payload: currentRate})
    } catch(e) {
        if(e === 'unauthorized') {
            yield put({type: SET_USER_TOKEN, payload: ""})
            yield put({type: SET_USER, payload: {}})
        }
    }
}

function* fetchNews(payload) {
    try {
        const news = yield call(Api.fetchNews, payload)
        yield put({ type: SET_NEWS, payload: news})
    } catch(e) {
        if(e === 'unauthorized') {
            yield put({type: SET_USER_TOKEN, payload: ""})
            yield put({type: SET_USER, payload: {}})
        }
    }
}

function* computeTopVolumeStocks() {
    const current_rate = yield select(getCurrentRateFromState)
    const color = ['#74b9ff', '#ffeaa7', '#00cec9', '#b2bec3', '#e17055', '#fab1a0', '#00b894']
    let total = 0
    let result = []
    current_rate.forEach(rate => total += Number(rate.current_rate.volume))
    current_rate.forEach((rate, i) => result.push({ name: rate.symbol, color: color[i], value: (parseFloat(rate.current_rate.volume)/parseFloat(total))}))
    yield put({type: SET_TOP_VOLUME_STOCKS, payload: result})
}

function* computeRatesChart() {
    const current_rate = yield select(getCurrentRateFromState)
    let result = []
    current_rate.forEach(rate => {
        result.push({ 
            name: rate.symbol, 
            open: parseFloat(rate.current_rate.open).toFixed(2), 
            high: parseFloat(rate.current_rate.high).toFixed(2), 
            low: parseFloat(rate.current_rate.low).toFixed(2), 
            close: parseFloat(rate.current_rate.close).toFixed(2)
        })
    })
    yield put({type: SET_RATES_CHART, payload: result})
}

function* computeRatesVariation() {
    const current_rate = yield select(getCurrentRateFromState)
    let result = []
    current_rate.forEach(rate => {
        let variance = ((rate.current_rate.high - rate.history[rate.history.length - 1].high) / rate.history[rate.history.length - 1].high) * 100
        let color = '#dfe6e9'
        if(variance > 0) color = '#00b894'
        else if (variance < 0)color = '#d63031'
        result.push({ name: rate.symbol, variance, color, current: rate.current_rate.high, prev: rate.history[rate.history.length - 1].high })
    })
    yield put({type: SET_RATES_VARIATION, payload: result})
}

function* mySaga() {
    yield takeEvery(LOGIN, loginToStockio)
    yield takeEvery(SIGNUP, signUpToStockio)
    yield takeEvery(FETCH_ALL_STOCKS, fetchAllStocks)
    yield takeEvery(FETCH_NEWS, fetchNews)
    yield takeEvery(SEATCH_STOCK, searchStocks)
    yield takeEvery(FETCH_MY_STOCKS, fetchMyStocks)
    yield takeEvery(SAVE_MY_STOCKS, savemyStocks)
    yield takeEvery(SEARCH_MY_STOCKS, searchMyStocks)
    yield takeEvery(DELETE_MY_STOCKS, deleteMyStocks)
    yield takeEvery(FETCH_CURRENT_RATE, getCurrentRate)
    yield takeEvery(COMPUTE_TOP_VOLUME_STOCKS, computeTopVolumeStocks)
    yield takeEvery(COMPUTE_RATES_CHART, computeRatesChart)
    yield takeEvery(COMPUTE_RATES_VARIATION, computeRatesVariation)
}

export default mySaga
