import axios from 'axios'
import localStore from '../services/localStorage'

axios.interceptors.request.use(config => {
    let token = localStore.getUserInfo();
    if (token.accessToken && config.headers) {
        config.headers = {
            'Authorization': `Bearer ${token.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    return config
})

export default axios

export const SERVER_URL = 'http://127.0.0.1:3500'