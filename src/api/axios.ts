import axios, {HttpStatusCode} from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

axiosInstance.interceptors.request.use((config) => {
    if (localStorage.getItem("jwt")) {
        config.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`
    }
    config.headers["Content-Type"] = "application/json"
    return config
})

axiosInstance.interceptors.response.use((response) => response,
    async function (error) {
        const originalRequest = error?.config
        const status = error?.response?.status

        if ((status === HttpStatusCode.Unauthorized) && !originalRequest?.retry) {
            originalRequest.retry = true
            localStorage.removeItem("jwt")
            originalRequest.headers.Authorization = undefined
            return axiosInstance(originalRequest)
        }
        return Promise.reject(error)
    }
)

export default axiosInstance