import { ReactNode } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";

import { router } from "expo-router";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
interface Props {
  title: string;
  children: ReactNode;
}

export const CustomHeaderScrollView = ({ title, children }: Props) => {
  return (
    <SafeAreaView className="flex-1 justify-start">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mx-3">
          <View className="flex-row justify-start items-center pt-4 pb-4">
            <Pressable onPress={() => router.back()}>
              <FontAwesome6 name="chevron-left" size={18} />
            </Pressable>
            <Text className="text-xl font-bold ml-2">{title}</Text>
            {/* <Pressable onPress={() => router.push("/profile")}>
                <Avatar alt={user.firstname}>
                  <AvatarFallback>
                    <Text className="uppercase">{`${user.firstname.charAt(0)}${user.lastname.charAt(0)}`}</Text>
                  </AvatarFallback>
                </Avatar>
              </Pressable> */}
          </View>
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
