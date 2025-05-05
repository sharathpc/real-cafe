import { useEffect } from "react";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "@/store/authStore";
import { getCategories } from "@/services/GraphQl";

const Home = () => {
  const { logout } = useAuthStore();

  useEffect(() => {
    getCategories().then((data) => console.log(data));
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Text>Employee Home</Text>
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
