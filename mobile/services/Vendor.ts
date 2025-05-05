import { axiosInstance } from "./Interceptors";

const getVendorCategories = (): Promise<any> => {
  return axiosInstance(`/api/categories`).then((response) => response.data);
};

export { getVendorCategories };
