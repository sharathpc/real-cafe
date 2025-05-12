import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  View,
  Image,
  Text,
  Alert,
  SafeAreaView,
  Animated,
  Button,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import { imageData, lightColors } from "@/utils";
import { STRAPI_URL } from "@/constants/Variables";
import { getStrapiToken } from "@/services/Authentication";
import { useAuthStore } from "@/store/authStore";

const gradientColors = [...lightColors].reverse();

const EmployeeLogin = () => {
  const { token, setAuthInfo } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuth = async () => {
    const callbackUrl = Linking.createURL("employeeLogin");

    try {
      const unifedInfo = await WebBrowser.openAuthSessionAsync(
        `${STRAPI_URL}/api/connect/unified?callback=${callbackUrl}`,
        callbackUrl
      );

      if (unifedInfo.type === "success") {
        const parsedUrl = new URL(unifedInfo.url);
        getStrapiToken(parsedUrl.search)
          .then((data) => {
            setAuthInfo(data.jwt, data.user);
          })
          .finally(() => setLoading(false));
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token]);

  return (
    <SafeAreaView className="flex-1">
      <View className="justify-center items-center w-full px-2.5 pb-2.5">
        <Image source={imageData[7]} className="h-12 w-12 rounded-2xl my-2.5" />
        <Text className="text-2xl font-bold text-gray-80">
          Order online,collect seamlessly
        </Text>
        <Text className="text-2xl font-semibold mt-0.5 mb-7 opacity-80 text-gray-900">
          Log in with Unified
        </Text>
        <Button title="Unified Login" onPress={() => handleAuth()}></Button>

        <Button
          title="Vendor Login"
          onPress={() => router.push("/(auth)/vendorLogin")}
        ></Button>
      </View>
    </SafeAreaView>
  );
};
export default EmployeeLogin;
