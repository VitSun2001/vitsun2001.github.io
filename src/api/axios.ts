import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:1337/",
})

axiosInstance.interceptors.request.use((config) =>{
    if(localStorage.getItem("jwt"))
        config.headers["Authorization"] = localStorage.getItem("jwt")
    config.headers["Content-Type"] = "application/json"
    return config
})

export default axiosInstance