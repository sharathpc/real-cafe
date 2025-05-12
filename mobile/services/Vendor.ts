import { axiosInstance } from "./Interceptors";

const getVendorProducts = (vendorId: string): Promise<any> => {
  console.log(vendorId);
  return axiosInstance(`/api/products`, {
    params: {
      fields: ["name", "price", "available"],
      populate: {
        image: {
          fields: ["name", "url"],
        },
        category: {
          fields: ["name"],
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

export { getVendorProducts };
