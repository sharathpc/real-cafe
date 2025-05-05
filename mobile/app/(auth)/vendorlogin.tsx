import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, TextInput } from "react-native";
import { router } from "expo-router";

import { useAuthStore } from "@/store/authStore";
import { getStrapiAdminToken } from "@/services/Authentication";

const VendorLogin = () => {
  const { token, setAuthInfo } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("projectc.admin@gmail.com");
  const [password, setPassword] = useState<string>("Admin@123");

  const handleAdminLogin = async () => {
    getStrapiAdminToken(email, password)
      .then((data) => {
        setAuthInfo(
          data.token,
          data.user,
          process.env.EXPO_PUBLIC_STRAPI_API_KEY
        );
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-gray-80">
          Order online,collect seamlessly
        </Text>
        <Text className="text-2xl font-semibold mt-0.5 mb-7 opacity-80 text-gray-900">
          Vendor Log in
        </Text>

        <TextInput
          style={{ height: 40, padding: 5 }}
          inputMode="email"
          placeholder="Email"
          onChangeText={(newText) => setEmail(newText)}
          value={email}
        />

        <TextInput
          style={{ height: 40, padding: 5 }}
          inputMode="text"
          placeholder="Password"
          onChangeText={(newText) => setPassword(newText)}
          value={password}
          secureTextEntry={true}
        />

        <Button
          title="Vendor Login"
          onPress={() => handleAdminLogin()}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default VendorLogin;
