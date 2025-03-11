import { View, Text, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "@react-native-community/blur";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useCartStore } from "@/state/cartStore";
import { useScaleContext } from "@/context/scaleContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { CartHocItem } from "./CartHocItem";

export const CartHoc = () => {
  const { cart, clearCart } = useCartStore();
  const { scrollY } = useScaleContext();
  const bottom = useSafeAreaInsets();

  const clearCartItems = () => {
    clearCart();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          scrollY.value === 1
            ? withTiming(Platform.OS === "ios" ? -15 : 0, { duration: 300 })
            : withTiming(Platform.OS === "ios" ? -86 : -87, { duration: 300 }),
      },
    ],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className={`absolute bottom-0 w-full items-center py-8 p-[${bottom.bottom + 16}]}`}
    >
      {cart.map((item, index) => {
        return (
          <View key={index} className={"absolute items-center"}>
            <CartHocItem cartItem={item} />
          </View>
        );
      })}

      {cart.length > 0 && (
        <LinearGradient
          colors={[
            "rgba(255,255,255,0.1)",
            "rgba(255,255,255,1)",
            "rgba(255,255,255,1)",
            "rgba(255,255,255,1)",
            "rgba(255,255,255,0.98)",
            "rgba(255,255,255,1)",
          ]}
          className="absolute w-[100%] h-24 z-[-5] bottom-[-5]"
        />
      )}
    </Animated.View>
  );
};
