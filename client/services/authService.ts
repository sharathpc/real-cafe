import axios from 'axios'

import { API_BASE_URL } from '@/constants';
import { useAuthStore } from '@/state/authStore';
import { tokenStorage } from '@/state/storage';
import { appAxios } from './apiInterceptors';

const employeeLogin = (email : string,password : string) =>{
        return axios.post(`${API_BASE_URL}/employee/login`,{email,password}).then((response)=>{
            const {accessToken,refreshToken,employee} = response.data;
            tokenStorage.set('accessToken',accessToken);
            tokenStorage.set('refreshToken',refreshToken);
            const {setUser} = useAuthStore.getState();
            setUser(employee)
        })
}

const refetchUser = (setUser : any) =>{
    return appAxios.get(`${API_BASE_URL}/profile`).then((response)=>{
        setUser(response.data.user);
    })
}

const refreshTokens = () =>{

    const currentRefreshToken = tokenStorage.getString('refreshToken');
    return axios.post(`${API_BASE_URL}/refresh_token`,{currentRefreshToken}).then((response)=>{
        const {accessToken,refreshToken,employee} = response.data;
        tokenStorage.set('accessToken',accessToken);
        tokenStorage.set('refreshToken',refreshToken);
        const {setUser} = useAuthStore.getState();
        setUser(employee)
        return response.data.accessToken;
    })
}

export {
    employeeLogin,
    refreshTokens,
    refetchUser
}