import { router } from "expo-router";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/authStore";

export default function Index() {
  const { token } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  const tokenCheck = () => {
    try {
      console.log("Token:", token);
      if (token) {
        router.replace("/(auth)/vendorLogin");
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
