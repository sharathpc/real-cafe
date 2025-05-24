import React, { useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-simple-toast";

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

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "anthera.kitchen@gmail.com",
      password: "AntheraKitchen@123",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      getStrapiAdminToken(values)
        .then((data) => {
          setAuthInfo(
            data.token,
            data.user,
            process.env.EXPO_PUBLIC_STRAPI_API_KEY
          );
        })
        .catch((error) => {
          Toast.show(error.response.data.error.message, Toast.SHORT, {
            backgroundColor: "#dc2626",
          });
        })
        .finally(() => setSubmitting(false));
    },
  });

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
                autoCapitalize={"none"}
                value={values.email}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
              />
              {errors.email && touched.email && (
                <Text className="text-xs font-medium color-red-600 m-1">
                  {errors.email}
                </Text>
              )}
            </View>
            <View>
              <Label>Password</Label>
              <Input
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize={"none"}
                value={values.password}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
              />
              {errors.password && touched.password && (
                <Text className="text-xs font-medium color-red-600 m-1">
                  {errors.password}
                </Text>
              )}
            </View>

            <View>
              <Button
                className="flex-0 flex-row justify-center items-center rounded-3xl"
                disabled={isSubmitting}
                onPress={() => handleSubmit()}
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
