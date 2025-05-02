import { router } from "expo-router";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/state/authStore";
import { tokenStorage } from "@/state/storage";

export default function Index() {
  const { setUser } = useAuthStore();

  const tokenCheck = () => {
    try {
      console.log("IN token check");
      const accessToken = tokenStorage.getString("accessToken") as string;
      const refreshToken = tokenStorage.getString("refreshToken") as string;

      console.log("Access token:", accessToken);

      if (accessToken) {
        const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
        const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

        const currentTime = Date.now() / 1000;
        if (decodedRefreshToken?.exp < currentTime) {
          router.push("/employeelogin");
          return false;
        }

        if (decodedAccessToken?.exp < currentTime) {
          try {
            refreshTokens();
            refetchUser(setUser);
          } catch (error) {
            console.log("error", error);
            return false;
          }
        }
        router.push("/employeelogin");

        //TODO if user is emplyee redirect them to home else to vendor home
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error("Error checking tokens:", error);
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return null;
}
