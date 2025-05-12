import { Tabs } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs initialRouteName="dashboard">
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false,
          tabBarLabel: "Dashboard",
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
        name="products"
        options={{
          headerShown: false,
          tabBarLabel: "Products",
          tabBarIcon: () => <Feather name="shopping-bag" size={20} />,
        }}
      />
    </Tabs>
  );
}
