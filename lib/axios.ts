import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'app-authorization': process.env.NEXT_PUBLIC_APPLICATION_TOKEN,
    },
})

export default axios