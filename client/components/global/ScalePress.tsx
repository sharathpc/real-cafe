import { View, Text, Animated, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";

interface Props {
  onPress?: () => void;
  onLongPress?: () => void;
  children: ReactNode;
  className?: string;
}

export const ScalePress = ({
  onPress,
  onLongPress,
  children,
  className,
}: Props) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressOut={onPressOut}
      onPressIn={onPressIn}
      onLongPress={onLongPress}
      activeOpacity={1}
      className={`${className}`}
    >
      <Animated.View
        style={{ transform: [{ scale: scaleValue }], width: "100%" }}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};
