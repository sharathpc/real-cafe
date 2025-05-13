import { useEffect, useState } from "react";
import { router } from "expo-router";
import { View, SafeAreaView } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Image } from "expo-image";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import { STRAPI_URL } from "@/constants/Variables";
import { getStrapiToken } from "@/services/Authentication";
import { useAuthStore } from "@/store/authStore";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ProductImagesGrid } from "@/components/app/ProductImagesGrid";
import { RealpageLogo } from "@/utils";

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
    <ThemedView>
      <View className="h-screen justify-between">
        <ProductImagesGrid />
        <View className="container gap-2 p-8">
          <ThemedText className="text-center" type="title">
            Your Food Destination for Everyting
          </ThemedText>
          <ThemedText className="text-center" type="defaultSemiBold">
            Log in with Unified and start odering
          </ThemedText>
          <View>
            <Button
              className="flex-0 flex-row justify-center items-center rounded-3xl"
              disabled={loading}
              onPress={() => handleAuth()}
            >
              <Image
                source={RealpageLogo}
                style={{
                  width: 18,
                  height: 18,
                  marginRight: 10,
                  borderRadius: 999,
                }}
              />
              <Text>Unified Login</Text>
            </Button>
          </View>
          <View className="flex-0 flex-row justify-center items-center">
            <Text className="text-center">Are you a vendor?</Text>
            <Button
              size={"link"}
              variant={"link"}
              onPress={() => router.push("/(auth)/vendorLogin")}
            >
              <Text className="font-semibold">Vendor Login</Text>
            </Button>
          </View>
        </View>
      </View>
    </ThemedView>
  );
};
export default EmployeeLogin;
