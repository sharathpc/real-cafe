import { View } from "react-native";
import React from "react";
import { useCartStore } from "@/store/cartStore";
import { OrderItem } from "./OrderItem";

export const OrderList = () => {
  const { cart } = useCartStore();
  return (
    <View className="bg-white rounded-md mb-4 p-3">
      {cart.map((cartItem) => {
        return <OrderItem key={cartItem._id} item={cartItem} />;
      })}
    </View>
  );
};
