import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="employeeLogin"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="vendorLogin"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
}
