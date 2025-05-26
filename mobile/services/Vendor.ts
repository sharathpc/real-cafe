import { axiosInstance } from "./Interceptors";

const getAllCategories = (): Promise<any> => {
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

export { getAllCategories };
