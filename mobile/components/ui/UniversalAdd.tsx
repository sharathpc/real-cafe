import { View, Text, Pressable } from "react-native";
import React from "react";
import { Product } from "@/models";
import { useCartStore } from "@/store/cartStore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  item: Product;
}

export const UniversalAdd = ({ item }: Props) => {
  const count = useCartStore((state) => state.getItemCount(item._id));
  const { addItem, removeItem } = useCartStore();
  return (
    <View
      className={`container ${count === 0 ? "bg-white  border-orange-500" : "bg-green-700 border-green-700 border-2"}  items-center justify-center border-2 w-1/2 rounded-lg mt-1`}
    >
      {count === 0 ? (
        <Pressable
          onPress={() => addItem(item)}
          className="add w-[100%] items-center justify-center px-1 py-2"
        >
          <Text className="text-orange-500 font-semibold">ADD</Text>
        </Pressable>
      ) : (
        <View className="flex-row items-center justify-evenly w-[100%] px-1 py-2 ">
          <Pressable onPress={() => removeItem(item._id)}>
            <Icon name="minus" color={"#fff"} size={RFValue(13)} />
          </Pressable>
          <Text className="text-white font-semibold text-xl">{count}</Text>
          <Pressable onPress={() => addItem(item)}>
            <Icon name="plus" color={"#fff"} size={RFValue(13)} />
          </Pressable>
        </View>
      )}
    </View>
  );
};
