import { Tabs } from "expo-router";

import { ScaleContextProvider } from "@/context/ScaleContext";
import { BottomTabs } from "@/components/tabs/BottomTabs";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="home"
      tabBar={(props) => (
        <ScaleContextProvider>
          <BottomTabs {...props} />
        </ScaleContextProvider>
      )}
    >
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="orders" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
}
