import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children?: ReactNode;
  className?: string;
}

export const CustomSafeAreaView = ({ children, className }: Props) => {
  return (
    <SafeAreaView className={`flex-1 ${className}`}>
      <View className={`flex-1 ${className}`}>{children}</View>
    </SafeAreaView>
  );
};
