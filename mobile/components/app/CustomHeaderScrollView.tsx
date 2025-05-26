import { ReactNode } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";

import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { cn } from "@/lib/utils";
interface Props {
  title: string;
  isBackButton?: boolean;
  children: ReactNode;
}

export const CustomHeaderScrollView = ({
  title,
  isBackButton = false,
  children,
}: Props) => {
  return (
    <SafeAreaView className="flex-1 justify-start">
      <View className="mx-3">
        <View className="flex-row justify-start items-center pt-4 pb-4">
          {isBackButton && (
            <Pressable className="mr-4" onPress={() => router.back()}>
              <FontAwesome6 name="chevron-left" size={18} />
            </Pressable>
          )}
          <Text
            className={cn(isBackButton ? "text-xl" : "text-4xl", "font-bold")}
          >
            {title}
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
