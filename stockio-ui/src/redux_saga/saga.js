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
    SET_USER
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

function* mySaga() {
    yield takeEvery(LOGIN, loginToStockio)
}

export default mySaga
