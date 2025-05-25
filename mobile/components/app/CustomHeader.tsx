import { router } from "expo-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { View, Text, Pressable } from "react-native";
import { useAuthStore } from "@/store/authStore";

export const CustomHeader = ({ title }: { title: string }) => {
  const { user } = useAuthStore();
  return (
    <View className="flex-row justify-between items-center pt-20 pb-4 px-2">
      <Text className="text-4xl font-bold capitalize">{title}</Text>
      <Pressable onPress={() => router.push("/profile")}>
        <Avatar alt={user.firstname}>
          <AvatarFallback>
            <Text className="uppercase">{`${user.firstname.charAt(0)}${user.lastname.charAt(0)}`}</Text>
          </AvatarFallback>
        </Avatar>
      </Pressable>
    </View>
  );
};
