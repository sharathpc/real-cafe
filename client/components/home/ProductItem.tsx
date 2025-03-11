import { View, Text, Image } from "react-native";
import React from "react";
import { Product } from "@/models";
import { CustomText } from "../ui/CustomText";
import { UniversalAdd } from "../ui/UniversalAdd";

interface Props {
  item: Product;
  index: any;
}

export const ProductItem = ({ item, index }: Props) => {
  return (
    <View className="w-1/2 rounded-lg bg-white mb-3 ml-3 overflow-hidden">
      <View className={`imageContainer h-40 justify-center items-center`}>
        <Image
          source={{ uri: item.image }}
          className="image h-full w-full aspect-square object-contain"
        />
      </View>
      <View className="content felx-1 justify-center items-center mb-3">
        <CustomText>{item.name}</CustomText>
        <UniversalAdd item={item} />
      </View>
    </View>
  );
};
