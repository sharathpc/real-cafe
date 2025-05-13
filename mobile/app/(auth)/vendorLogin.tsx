import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { useFormik } from "formik";

import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/authStore";
import { getStrapiAdminToken } from "@/services/Authentication";
import { Input } from "@/components/ui/input";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { VendorImage } from "@/utils";

const VendorLogin = () => {
  const { token, setAuthInfo } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("suresh.kumar@gmail.com");
  const [password, setPassword] = useState<string>("SureshKumar@123");

  const { handleChange, handleBlur, handleSubmit, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
    <ThemedView>
      <View className="h-screen">
        <View className="flex-1 flex-col justify-center">
          <View className="flex-0 justify-center items-center">
            <View className="w-80 h-80 rounded-full bg-slate-200">
              <Image
                source={VendorImage}
                contentFit="cover"
                style={{ width: "110%", height: "100%" }}
              />
            </View>
          </View>
          <View className="container gap-2 p-8">
            <View>
              <Label>Email</Label>
              <Input
                placeholder="Email"
                //leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize={"none"}
              />
            </View>
            <View>
              <Label>Password</Label>
              <Input
                placeholder="Password"
                //   leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                autoCapitalize={"none"}
              />
            </View>

            <View>
              <Button
                className="flex-0 flex-row justify-center items-center rounded-3xl"
                disabled={loading}
                onPress={() => handleAdminLogin()}
              >
                <Text>Login</Text>
              </Button>
            </View>

            <View className="flex-0 flex-row justify-center items-center">
              <Text className="text-center">Not a vendor?</Text>
              <Button
                size={"link"}
                variant={"link"}
                onPress={() => router.back()}
              >
                <Text className="font-semibold">Employee Login</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
};

export default VendorLogin;
