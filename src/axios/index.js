import axios from "axios"

const axiosClient = axios.create()

axiosClient.interceptors.request.use(config => {
    config.headers["X-Access-Key"] = import.meta.env.VITE_ACCESS_KEY
    return config
})

export default axiosClient