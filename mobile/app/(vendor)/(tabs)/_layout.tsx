import { Tabs } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { CustomHeader } from "@/components/app/CustomHeader";

export default function TabLayout() {
  return (
    <Tabs initialRouteName="dashboard">
      <Tabs.Screen
        name="dashboard"
        options={({ route }) => ({
          header: () => <CustomHeader title={route.name} />,
          tabBarLabel: "Dashboard",
          tabBarIcon: () => <AntDesign name="dashboard" size={20} />,
        })}
      />
      <Tabs.Screen
        name="orders"
        options={({ route }) => ({
          header: () => <CustomHeader title={route.name} />,
          tabBarLabel: "Orders",
          tabBarIcon: () => <Feather name="archive" size={20} />,
        })}
      />
      <Tabs.Screen
        name="products"
        options={({ route }) => ({
          header: () => <CustomHeader title={route.name} />,
          tabBarLabel: "Products",
          tabBarIcon: () => <Feather name="shopping-bag" size={20} />,
        })}
      />
    </Tabs>
  );
}
