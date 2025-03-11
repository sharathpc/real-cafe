import { API_BASE_URL } from "@/constants";
import { tokenStorage } from "@/state/storage";
import axios from "axios";
// import { refreshTokens } from "./authService";
import { Alert } from "react-native";


export const appAxios = axios.create({
    baseURL:API_BASE_URL
})

appAxios.interceptors.request.use(async config =>{
    const accessToken = tokenStorage.getString('accessToken');
    if(accessToken){
        config.headers.Authorization=`Bearer ${accessToken}`
    }
    return config;
})

appAxios.interceptors.response.use(
    response => response,
    async error =>{
        if(error.response && error.response.status === 401){
            // refreshTokens().then((accessToken)=>{
            //     error.config.headers.Authorization = `Bearer ${accessToken}`
            //     return axios(error.config)
            // }).catch(error=>{
            //     console.log("ERROR REFRESHING TOKEN IN AXIOS")
            // })
        }
        if(error.response && error.response.state !== 401){
            Alert.alert(error.response.data.message ?? "something went wrong in appaxios interceptor")
        }
        return Promise.resolve(error)
    }
)