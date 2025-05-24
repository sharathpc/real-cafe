import { axiosInstance } from "./Interceptors";

const getAllCategories = (): Promise<any> => {
  return axiosInstance(`/api/categories`, {
    params: {
      fields: ["name"],
      populate: {
        image: {
          fields: ["name", "url"],
        },
      },
    },
  }).then((response) => response.data);
};

const getVendorProducts = (vendorId: string): Promise<any> => {
  return axiosInstance(`/api/products`, {
    params: {
      fields: ["name", "price", "available"],
      populate: {
        image: {
          fields: ["name", "url"],
        },
        category: {
          fields: ["name"],
          populate: {
            image: {
              fields: ["name", "url"],
            },
          },
        },
      },
      filters: {
        vendor: {
          documentId: vendorId,
        },
      },
    },
  }).then((response) => response.data);
};

export { getAllCategories, getVendorProducts };
