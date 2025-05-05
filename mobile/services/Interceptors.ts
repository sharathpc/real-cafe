import axios from "axios";
import { Alert } from "react-native";

import { STRAPI_URL } from "@/constants/Variables";

export const axiosInstance = axios.create({
  baseURL: STRAPI_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // refreshTokens().then((accessToken)=>{
      //     error.config.headers.Authorization = `Bearer ${accessToken}`
      //     return axios(error.config)
      // }).catch(error=>{
      //     console.log("ERROR REFRESHING TOKEN IN AXIOS")
      // })
    }
    if (error.response && error.response.state !== 401) {
      Alert.alert(
        error.response.data.message ??
          "something went wrong in appaxios interceptor"
      );
    }
    return Promise.resolve(error);
  }
);
