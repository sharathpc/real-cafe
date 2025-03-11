import { ActivityIndicator, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Product } from "@/models";
import { ProductItem } from "./ProductItem";
import { getAllCategoriesById } from "@/services";

interface Props {
  productId: string;
}

export const ProductList = ({ productId }: Props) => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const renderItem = ({ item, index }: { item: Product; index: any }) => {
    return <ProductItem item={item} index={index} />;
  };

  useEffect(() => {
    setLoading(true);
    getAllCategoriesById(productId)
      .then((data) => {
        console.log(
          "products based on categoryId---------------------------------------------------------",
          productId,
          data
        );
        setItems(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  return (
    <View className="flex-1">
      {loading ? (
        <ActivityIndicator className="flex items-center justify-center" />
      ) : (
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          className="flex-1 h-full"
        />
      )}
    </View>
  );
};
