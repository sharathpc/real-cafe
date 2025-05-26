import { ICategory, IMeta, IProduct, IProductUpdate } from "@/models";
import { axiosInstance } from "./Interceptors";

const getAllCategoriesWithProducts = (): Promise<{
  data: ICategory[];
  meta: IMeta;
}> => {
  return axiosInstance(`/api/categories`, {
    params: {
      fields: ["name"],
      sort: ["name"],
      populate: {
        image: {
          fields: ["name", "url"],
        },
        products: {
          fields: ["name", "available"],
          sort: ["name"],
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
      populate: {
        image: {
          fields: ["name", "url"],
        },
        category: {
          fields: ["name"],
        },
      },
    },
  }).then((response) => response.data);
};

const getAllCategories = (): Promise<{
  data: ICategory[];
  meta: IMeta;
}> => {
  return axiosInstance(`/api/categories`, {
    params: {
      populate: {
        image: {
          fields: ["name", "url"],
        },
      },
    },
  }).then((response) => response.data);
};

const updateProductDetails = (
  productId: string,
  payload: IProductUpdate
): Promise<void> => {
  return axiosInstance.put(`/api/products/${productId}`, {
    data: {
      ...payload,
      category: {
        connect: [payload.category.value],
      },
    },
  });
};

export {
  getAllCategoriesWithProducts,
  getProductDetails,
  getAllCategories,
  updateProductDetails,
};
