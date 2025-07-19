import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-gray-80">
          This screen doesn't exist.
        </Text>
      </View>
    </>
  );
}
