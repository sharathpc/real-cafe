import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { cartItem, Product } from "@/models";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { useCartStore } from "@/store/cartStore";

interface Props {
  cartItem: cartItem;
}

export const CartHocItem = ({ cartItem }: Props) => {
  const { removeItem } = useCartStore();
  const productItem: Product = cartItem?.item;

  return (
    <View className=" flex-row items-center justify-between p-2 mb-2.5 border border-gray-200 rounded-lg shadow-sm shadow-black bg-white w-[96%] self-center">
      <View className="flex-row items-center gap-2.5">
        <Image
          source={{ uri: productItem?.image }}
          className="w-10 h-10 rounded-lg object-cover"
        />
        <View className="flex-row">
          <Text className="font-serif font-xs">{productItem.name}</Text>
          <Text className="font-xs  font-medium  ml-3">
            {cartItem.count > 1
              ? `${cartItem.count} items`
              : `${cartItem.count} item`}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2.5">
        <TouchableOpacity
          className="bg-orange-500 px-2.5 py-1.25 justify-center items-center rounded-md"
          onPress={() => router.push("/checkout")}
        >
          <Text className="font-xs text-white font-semibold p-3">
            View Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeItem(cartItem._id)}>
          <Icon name="close" size={RFValue(12)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
