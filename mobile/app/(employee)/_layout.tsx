import { Tabs } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs initialRouteName="home">
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: () => <AntDesign name="dashboard" size={20} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          headerShown: false,
          tabBarLabel: "Orders",
          tabBarIcon: () => <Feather name="archive" size={20} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: () => <Feather name="shopping-bag" size={20} />,
        }}
      />
    </Tabs>
  );
}
