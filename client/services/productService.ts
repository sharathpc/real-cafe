import { API_BASE_URL } from '@/constants';
import { Category } from '@/models';
//import { appAxios } from '@/services';
import axios from 'axios';

const getAllCategories = ():Promise<Category[]>=>{
        return axios.get(`${API_BASE_URL}/categories`).then(response=>response.data);
}

const getAllCategoriesById = (productId : string) =>{
    return axios.get(`${API_BASE_URL}/products/${productId}`).then(response=>response.data);
}

export{
    getAllCategories,
    getAllCategoriesById
}