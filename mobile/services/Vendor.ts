import { ICategory, IMeta, IProduct } from "@/models";
import { axiosInstance } from "./Interceptors";

const getAllCategories = (): Promise<{
  data: ICategory[];
  meta: IMeta;
}> => {
  return axiosInstance(`/api/categories`, {
    params: {
      fields: ["name"],
      populate: {
        image: {
          fields: ["name", "url"],
        },
        products: {
          fields: ["name", "available"],
          populate: {
            image: {
              fields: ["name", "url"],
            },
            vendor: {
              fields: ["username"],
            },
          },
        },
      },
    },
  }).then((response) => response.data);
};

const getProductDetails = (
  productId: string
): Promise<{
  data: IProduct;
  meta: IMeta;
}> => {
  return axiosInstance(`/api/products/${productId}`, {
    params: {
      //fields: ["name", "available"],
      populate: {
        image: {
          fields: ["name", "url"],
        },
      },
    },
  }).then((response) => response.data);
};

export { getAllCategories, getProductDetails };
