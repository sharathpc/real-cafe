import {
  ICategory,
  IMeta,
  IProduct,
  IProductUpdate,
  IUser,
  IUserUpdate,
  IVendorOrder,
} from "@/models";
import { axiosInstance } from "./Interceptors";

const getAllOrders = (
  vendorId: string
): Promise<{
  data: IVendorOrder[];
  meta: IMeta;
}> => {
  return axiosInstance(`/api/orders`, {
    params: {
      fields: ["order_status", "createdAt", "updatedAt"],
      populate: {
        items: {
          fields: ["quantity"],
          populate: {
            product: {
              fields: ["name", "price"],
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
          filters: {
            product: {
              vendor: {
                documentId: vendorId,
              },
            },
          },
        },
        user: {
          fields: ["email", "firstname", "lastname"],
        },
      },
      filters: {
        items: {
          product: {
            vendor: {
              documentId: vendorId,
            },
          },
        },
      },
    },
  }).then((response) => response.data);
};

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

const updateVendorDetails = (
  vendorId: number,
  token: string,
  payload: IUserUpdate
): Promise<{ data: IUser }> => {
  return axiosInstance
    .put(
      `/admin/users/${vendorId}`,
      {
        ...payload,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data);
};

export {
  getAllOrders,
  getAllCategoriesWithProducts,
  getProductDetails,
  getAllCategories,
  updateProductDetails,
  updateVendorDetails,
};
