import { axiosInstance } from "./Interceptors";

const callStrapiGraphQl = (query: string): Promise<any> => {
  return axiosInstance
    .post(`/graphql`, { query })
    .then((response) => response.data);
};

const getCategories = (): Promise<any> => {
  return callStrapiGraphQl(`
    query InitialData {
        categories {
            documentId
            name
        }
    }
  `);
};

export { getCategories };
