import { router } from "expo-router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { useAuthStore } from "@/store/authStore";
import { axiosInstance } from "@/services/Interceptors";

export default function Index() {
  const { token, vendorApiToken, logout } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  const tokenCheck = () => {
    try {
      if (token) {
        const decodedJwt: { exp: number } = jwtDecode(token);
        if (decodedJwt.exp * 1000 > Date.now()) {
          axiosInstance.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${vendorApiToken ? vendorApiToken : token}`;
            return config;
          });
          router.replace(
            vendorApiToken ? "/(vendor)/dashboard" : "/(employee)/home"
          );
        } else {
          logout();
          router.replace("/(auth)/employeeLogin");
        }
      } else {
        router.replace("/(auth)/employeeLogin");
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
}
