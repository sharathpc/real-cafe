import axios from "axios";

import { STRAPI_URL } from "@/constants/Variables";

const getStrapiToken = (params: any): Promise<any> => {
  return axios(`${STRAPI_URL}/api/auth/unified/callback`, {
    params,
  }).then((response) => response.data);
};

export {
    getStrapiToken
}
