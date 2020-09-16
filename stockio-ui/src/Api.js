import {
    LOGIN_URL,
    SIGNUP_URL,
    STOCKS_SHOWALL_URL,
    NEWS_URL,
    SEARCH_URL
} from './constants/urls'

class Api {

    static goBackToLoginPage() {
        window.location.replace("/lobby")
    }

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
    static async fetchAllStocks(action) {
        let headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': action.payload.trim()
            }
        }
        const response = await fetch(STOCKS_SHOWALL_URL, headers)
        if(response.ok) {
            return response.json()
        }
        const errorMessage = await response.json()
        throw errorMessage
    }
    static async searchStocks(action) {
        let url = `${SEARCH_URL}${action.payload.value}`
        let headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': action.payload.token.trim()
            }
        }
        const response = await fetch(url, headers)
        if(response.ok) {
            return response.json()
        }
        const errorMessage = await response.json()
        throw errorMessage
    }
    static async fetchNews(action) {
        let headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': action.payload.trim()
            }
        }
        const response = await fetch(NEWS_URL, headers)
        if(response.ok) {
            return response.json()
        } else {
            throw "unauthorized"
        }
    }
}

export default Api
