import { useState } from "react";
import { router } from "expo-router";
import { View, Image, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import { imageData, lightColors } from "@/utilis";
import { CustomText } from "@/components/ui/CustomText";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomSafeAreaView, ProductSlider } from "@/components";
import { STRAPI_URL } from "@/constants/Variables";
import { getStrapiToken } from "@/services/Authentication";
import { useAuthStore } from "@/store/authStore";

const gradientColors = [...lightColors].reverse();

const EmployeeLogin = () => {
  const { setAuthInfo } = useAuthStore();
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
            console.log(data);
            setAuthInfo(data.jwt, data.user);
            router.replace("/(auth)/vendorLogin");
          })
          .finally(() => setLoading(false));
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <CustomSafeAreaView>
        {/* <ProductSlider /> */}
        {/* <Animated.ScrollView
          bounces={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.subContent}
        > */}
        <LinearGradient colors={gradientColors} className="pt-14 w-full" />
        <View className="justify-center items-center w-full bg-white px-2.5 pb-2.5">
          <Image
            source={imageData[7]}
            className="h-12 w-12 rounded-2xl my-2.5"
          />
          <CustomText customStyle="text-2xl font-bold text-gray-80">
            Order online,collect seamlessly
          </CustomText>
          <CustomText customStyle="text-2xl font-semibold mt-0.5 mb-7 opacity-80 text-gray-900">
            Log in or sign up
          </CustomText>
          <CustomButton
            title="Unified Login"
            onPress={() => handleAuth()}
            loading={loading}
          ></CustomButton>
        </View>
        {/* </Animated.ScrollView> */}
      </CustomSafeAreaView>
    </View>
  );
};
export default EmployeeLogin;

const styles = StyleSheet.create({
  subContent: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
});
