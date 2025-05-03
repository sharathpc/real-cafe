import { router } from "expo-router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { useAuthStore } from "@/store/authStore";

export default function Index() {
  const { token } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  const tokenCheck = () => {
    try {
      if (!token) {
        router.replace("/(auth)/employeeLogin");
      } else {
        const decodedJwt: { exp: number } = jwtDecode(token);
        if (decodedJwt.exp * 1000 > Date.now()) {
          router.replace("/(auth)/vendorLogin");
        } else {
          router.replace("/(auth)/employeeLogin");
        }
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
