import { AntDesign, Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarBadgeStyle: {
          height: 80,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: () => <AntDesign name="dashboard" size={20} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          headerShown: false,
          tabBarLabel: 'Orders',
          tabBarIcon: () => <Feather name="archive" size={20} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          headerShown: false,
          tabBarLabel: 'Products',
          tabBarIcon: () => <Feather name="shopping-bag" size={20} />,
        }}
      />
    </Tabs>
  );
}
