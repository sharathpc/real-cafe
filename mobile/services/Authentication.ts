import axios from "axios";

import { STRAPI_URL } from "@/constants/Variables";
import { IUserModel } from "@/models";

const getStrapiToken = (
  searchParams: any
): Promise<{
  jwt: string;
  user: IUserModel;
}> => {
  return axios(`${STRAPI_URL}/api/auth/unified/callback${searchParams}`).then(
    (response) => response.data
  );
};

const getStrapiAdminToken = (credentials: {
  email: string;
  password: string;
}): Promise<{
  token: string;
  user: IUserModel;
}> => {
  return axios
    .post(`${STRAPI_URL}/admin/login`, credentials)
    .then((response) => response.data.data);
};

export { getStrapiToken, getStrapiAdminToken };
