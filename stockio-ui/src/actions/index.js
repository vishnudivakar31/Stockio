import {SET_USER_TOKEN} from '../constants/action_types'

export function setUserToken(payload) {
    return { type: SET_USER_TOKEN, payload}
}