import { useEffect } from "react";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "@/store/authStore";
import { getVendorProducts } from "@/services/Vendor";

const Dashboard = () => {
  const { logout, user } = useAuthStore();

  useEffect(() => {
    if (user) {
      getVendorProducts(user.documentId).then((data) => console.log(data));
    }
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Text>Vendor Dashboard</Text>
      <View>
        <Button
          title="Logout"
          onPress={() => {
            logout();
            router.replace("/");
          }}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
