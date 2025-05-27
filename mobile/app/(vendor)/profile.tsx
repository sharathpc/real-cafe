import { View } from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";

import { useAuthStore } from "@/store/authStore";
import { CustomHeaderScrollView } from "@/components/app/CustomHeaderScrollView";
import { UserAvatar } from "@/components/app/UserAvatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { IUserUpdate } from "@/models";

const Profile = () => {
  const { user, logout } = useAuthStore();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<IUserUpdate>({
    initialValues: {
      documentId: user.documentId,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
    validationSchema: Yup.object().shape({
      firstname: Yup.string().required("Firstname is required"),
      lastname: Yup.string().required("Lastname is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
    },
  });

  return (
    <CustomHeaderScrollView title="Profile" isBackButton={true}>
      <View className="flex-1 justify-between items-center">
        <View className="justify-between items-center">
          <UserAvatar user={user} size={128} className="m-4" />
          <Button
            size={"link"}
            variant={"link"}
            onPress={() => {
              router.replace("/");
              logout();
            }}
          >
            <Text className="font-semibold">Logout</Text>
          </Button>
        </View>
        <View className="container gap-2 p-8">
          <View>
            <Label>Firstname</Label>
            <Input
              placeholder="Firstname"
              autoCapitalize="words"
              value={values.firstname}
              onBlur={handleBlur("firstname")}
              onChangeText={handleChange("firstname")}
            />
            {errors.firstname && touched.firstname && (
              <Text className="text-xs font-medium color-red-600 m-1">
                {errors.firstname}
              </Text>
            )}
          </View>
          <View>
            <Label>Lastname</Label>
            <Input
              placeholder="Lastname"
              autoCapitalize="words"
              value={values.lastname}
              onBlur={handleBlur("lastname")}
              onChangeText={handleChange("lastname")}
            />
            {errors.lastname && touched.lastname && (
              <Text className="text-xs font-medium color-red-600 m-1">
                {errors.lastname}
              </Text>
            )}
          </View>
          <View>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              value={values.email}
              onBlur={handleBlur("email")}
              onChangeText={handleChange("email")}
              editable={false}
            />
            {errors.email && touched.email && (
              <Text className="text-xs font-medium color-red-600 m-1">
                {errors.email}
              </Text>
            )}
          </View>
        </View>

        <View>
          <Button
            className="flex-0 flex-row justify-center items-center rounded-3xl"
            disabled={isSubmitting}
            onPress={() => handleSubmit()}
          >
            <Text>Update</Text>
          </Button>
        </View>
      </View>
    </CustomHeaderScrollView>
  );
};

export default Profile;
