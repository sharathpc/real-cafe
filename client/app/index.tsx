import { router } from "expo-router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Alert, Text, View } from "react-native";

import { useAuthStore } from "@/state/authStore";
import { tokenStorage } from "@/state/storage";
import { refetchUser, refreshTokens } from "@/services";

interface DecodedToken {
  exp: number;
}

const Index = () => {
  const { user, setUser, logout } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

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
          Alert.alert("Session Expired ", "Please login again");
          return false;
        }

        if (decodedAccessToken?.exp < currentTime) {
          try {
            refreshTokens();
            refetchUser(setUser);
          } catch (error) {
            console.log("error", error);
            Alert.alert("There was an error during fetching refresh token");
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
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      tokenCheck();
    }
  }, [isMounted]);

  return null;
};

export default Index;
