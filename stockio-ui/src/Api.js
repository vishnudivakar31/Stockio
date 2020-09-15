import {
    LOGIN_URL,
    SIGNUP_URL
} from './constants/urls'

class Api {
    static async loginWithCredentials(payload) {
        let headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        const response = await fetch(LOGIN_URL, headers)
        if(response.ok) {
            let token = response.headers.get('Authorization')
            let user = await response.json()
            return {user, token}
        }
        const errorMessage = await response.json()
        throw errorMessage
    }
    static async signupToStockio(payload) {
        let headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        const response = await fetch(SIGNUP_URL, headers)
        if(response.ok) {
            let token = response.headers.get('Authorization')
            let user = await response.json()
            return {user, token}
        }
        const errorMessage = await response.json()
        throw errorMessage
    }
}

export default Api
