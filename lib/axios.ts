import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'app-authorization': process.env.NEXT_PUBLIC_APPLICATION_TOKEN,
    },
    withCredentials: true,
})

export default axios