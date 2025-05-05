import { useEffect } from "react";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "@/store/authStore";
import { getVendorCategories } from "@/services/Vendor";

const Home = () => {
  const { logout } = useAuthStore();

  useEffect(() => {
    getVendorCategories().then((data) => console.log(data));
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Text>Vendor Home</Text>
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

export default Home;
