import {
    call,
    put,
    takeEvery
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
    FETCH_MY_STOCKS
} from '../constants/action_types'

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
            stocks.data = stocks.data.filter(stock => !my_stocks.includes(stock))
        }
        yield put({type: SET_ALL_STOCKS, payload: stocks})
        yield put({type: SAVE_MY_STOCKS, payload: my_stocks})
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

function* mySaga() {
    yield takeEvery(LOGIN, loginToStockio)
    yield takeEvery(SIGNUP, signUpToStockio)
    yield takeEvery(FETCH_ALL_STOCKS, fetchAllStocks)
    yield takeEvery(FETCH_NEWS, fetchNews)
    yield takeEvery(SEATCH_STOCK, searchStocks)
    yield takeEvery(FETCH_MY_STOCKS, fetchMyStocks)
}

export default mySaga
