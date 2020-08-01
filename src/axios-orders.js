import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://myreacta.firebaseio.com/'
})

export default instance;