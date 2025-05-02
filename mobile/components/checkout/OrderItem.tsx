import { View, Text, Image } from "react-native";
import React from "react";
import { cartItem } from "@/models";
import { UniversalAdd } from "../ui/UniversalAdd";

interface Props {
  item: cartItem;
}

export const OrderItem = ({ item }: Props) => {
  return (
    <View className="items-center flex-row gap-3 p-3 border-t-8 border-blue-50">
      <View className="bg-blue-50 p-2.5 rounded-lg w-[20%] items-center justify-center mb-2">
        <Image
          source={{ uri: item.item.image }}
          className="w-14 h-14 rounded-md"
        />
      </View>
      <View className="w-[20%]">
        <Text className="font-bold">{item.item.name}</Text>
      </View>
      <View className="w-[50%] items-end">
        <UniversalAdd item={item.item} />
      </View>
    </View>
  );
};
