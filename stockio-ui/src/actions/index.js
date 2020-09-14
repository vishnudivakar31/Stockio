import {
    SET_USER_TOKEN,
    LOGIN,
    LOGIN_ERROR,
    SET_USER
} from '../constants/action_types'

export function setUserToken(payload) {
    return { type: SET_USER_TOKEN, payload}
}

export function login(payload) {
    return { type: LOGIN, payload}
}

export function loginError(payload) {
    return { type: LOGIN_ERROR, payload}
}

export function setUser(payload) {
    return { type: SET_USER, payload }
}
