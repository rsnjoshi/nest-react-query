import axios from 'axios'
import localStore from '../services/localStorage'

axios.interceptors.request.use(config => {
    let token = localStore.getUserInfo();
    if (!token.sessionToken && config.headers) {
        config.headers['Authorization'] = `Bearer ${token.sessionToken}`
    }
    return config
})

export default axios

export const SERVER_URL = 'http://localhost:3000'