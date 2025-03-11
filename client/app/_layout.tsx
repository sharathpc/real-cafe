import { Stack } from "expo-router";
import "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(checkout)/checkout"
        options={{ headerTitle: "Checkout", headerTitleAlign: "center" }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
