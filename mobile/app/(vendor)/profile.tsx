import { Button, View } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";

const Profile = () => {
  const { logout } = useAuthStore();

  return (
    <View className="flex-1">
      <Button
        title="Logout"
        onPress={() => {
          logout();
          router.replace("/");
        }}
      ></Button>
    </View>
  );
};

export default Profile;
