import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="employeelogin"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="vendorlogin"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
}
