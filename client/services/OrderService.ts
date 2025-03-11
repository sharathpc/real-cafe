import { API_BASE_URL } from '@/constants';
import { appAxios } from './apiInterceptors';
import { Order } from '@/models';

const createOrder = (order : Order):Promise<any>=>{
    return appAxios.post(`${API_BASE_URL}/order`,order).then(response=>response.data);
}

export{
    createOrder
}