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
    SET_ALL_STOCKS
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
        const stocks = yield call(Api.fetchAllStocks, token)
        yield put({type: SET_ALL_STOCKS, payload: stocks})
    } catch(e) {
        console.log(e)
    }
}

function* mySaga() {
    yield takeEvery(LOGIN, loginToStockio)
    yield takeEvery(SIGNUP, signUpToStockio)
    yield takeEvery(FETCH_ALL_STOCKS, fetchAllStocks)
}

export default mySaga
