import { Tabs } from "expo-router";
import { Image, View } from "react-native";

import { icons } from "@/constants";
import { ScalePress } from "@/components/global/ScalePress";
import { ScaleContextProvider } from "@/context/scaleContext";
import { BottomTabs } from "@/components/tabs/BottomTabs";

interface Props {
  source: any;
  focused: boolean;
}

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
