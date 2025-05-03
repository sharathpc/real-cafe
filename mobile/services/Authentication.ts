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

export { getStrapiToken };
