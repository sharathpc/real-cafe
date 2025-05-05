import axios from "axios";

import { STRAPI_URL } from "@/constants/Variables";
import { PluginUsersPermissionsUser } from "@/types/contentTypes";

const getStrapiToken = (
  searchParams: any
): Promise<{
  jwt: string;
  user: PluginUsersPermissionsUser;
}> => {
  return axios(`${STRAPI_URL}/api/auth/unified/callback${searchParams}`).then(
    (response) => response.data
  );
};

const getStrapiAdminToken = (
  email: string,
  password: string
): Promise<{
  token: string;
  user: PluginUsersPermissionsUser;
}> => {
  return axios
    .post(`${STRAPI_URL}/admin/login`, {
      email,
      password,
    })
    .then((response) => response.data.data);
};

export { getStrapiToken, getStrapiAdminToken };
