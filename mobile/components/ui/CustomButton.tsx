import { ActivityIndicator, TouchableOpacity } from "react-native";
import React from "react";
import { CustomText } from "./CustomText";

interface Props {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const CustomButton = ({
  onPress,
  title,
  disabled,
  loading,
  className,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      className={`${className} justify-center items-center rounded-3xl p-4 my-4 w-full ${disabled ? "bg-[#ebedee]" : "bg-[#0076cc]"}`}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <CustomText customStyle="text-white">{title}</CustomText>
      )}
    </TouchableOpacity>
  );
};
