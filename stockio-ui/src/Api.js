import {
    LOGIN_URL,
    SIGNUP_URL,
    STOCKS_SHOWALL_URL,
    NEWS_URL,
    SEARCH_URL,
    BASE_STOCK_URL,
    BULK_STOCK,
    BULK_DELETE,
    GET_CURRENT_RATE
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
    static async getMyStocks(action) {
        let headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': action.payload.trim()
            }
        }
        const response = await fetch(BASE_STOCK_URL, headers)
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
    static async saveMyStocks(action) {
        let headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': action.payload.user_token.trim()
            },
            body: JSON.stringify(action.payload.stocks)
        }
        const response = await fetch(BULK_STOCK, headers)
        if(response.ok) {
            return response.json()
        }
        const errorMessage = await response.json()
        throw errorMessage
    }
    static async deleteMyStocks(action) {
        let headers = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': action.payload.user_token.trim()
            },
            body: JSON.stringify(action.payload.stocks)
        }
        const response = await fetch(BULK_DELETE, headers)
        if(response.ok) {
            return response.json()
        }
        const errorMessage = await response.json()
        throw errorMessage
    }
    static async getCurrentRate(action) {
        let headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': action.payload.user_token.trim()
            }
        }
        const response = await fetch(GET_CURRENT_RATE, headers)
        if(response.ok) {
            return response.json()
        }
        const errorMessage = await response.json()
        throw errorMessage
    }
}

export default Api
