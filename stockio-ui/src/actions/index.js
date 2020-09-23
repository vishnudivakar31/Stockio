import {
    SET_USER_TOKEN,
    LOGIN,
    LOGIN_ERROR,
    SET_USER,
    SIGNUP,
    SIGNOUT,
    FETCH_ALL_STOCKS,
    FETCH_NEWS,
    SET_NEWS,
    SEATCH_STOCK,
    FETCH_MY_STOCKS,
    SAVE_MY_STOCKS,
    SEARCH_MY_STOCKS,
    DELETE_MY_STOCKS,
    FETCH_CURRENT_RATE,
    SET_CURRENT_RATE
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

export function signUp(payload) {
    return { type: SIGNUP, payload }
}

export function signout() {
    return { type: SIGNOUT, payload: " " } 
}

export function fetchAllStocks(payload) {
    return {type: FETCH_ALL_STOCKS, payload}
}

export function fetchNews(payload) {
    return { type: FETCH_NEWS, payload}
}

export function setNews(payload) {
    return { type: SET_NEWS, payload}
}

export function searchStock(payload) {
    return { type: SEATCH_STOCK, payload}
}

export function fetchMyStocks(payload) {
    return { type: FETCH_MY_STOCKS, payload }
}

export function savemyStocks(payload) {
    return { type: SAVE_MY_STOCKS, payload }
}

export function searchmyStocks(payload) {
    return { type: SEARCH_MY_STOCKS, payload }
}

export function deleteMyStocks(payload) {
    return { type: DELETE_MY_STOCKS, payload }
}

export function getCurrentRate(payload) {
    return { type: FETCH_CURRENT_RATE, payload }
}

export function setCurrentRate(payload) {
    return { type: SET_CURRENT_RATE, payload }
}

