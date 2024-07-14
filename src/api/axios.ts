import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

axiosInstance.interceptors.request.use((config) =>{
    if(localStorage.getItem("jwt")){
        config.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`
    }
    config.headers["Content-Type"] = "application/json"
    return config
})

export default axiosInstance