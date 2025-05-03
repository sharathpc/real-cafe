import { View, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Category } from "@/models";
//import { getAllCategories } from "@/services";
import { Tab } from "./Tab";
import { ProductList } from "../ProductList";

export const CategoryTabs = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const renderItem = ({ item, index }: any) => {
    return (
      <Tab
        {...item}
        selected={item._id === selectedCategoryId}
        onPress={() => setSelectedCategoryId(item._id)}
      ></Tab>
    );
  };
  useEffect(() => {
    setLoading(true);
    /* getAllCategories()
      .then((data) => {
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategoryId(data[0]._id);
        }
        console.log("categories data", data);
      })
      .finally(() => {
        setLoading(false);
      }); */
  }, []);
  return (
    <View className="flex-1 items-center">
      {loading ? (
        <ActivityIndicator className="flex items-center justify-center" />
      ) : (
        <>
          <View>
            <FlatList
              className="grow-0"
              horizontal
              data={categories}
              bounces={false}
              initialNumToRender={10}
              contentContainerStyle={{
                paddingHorizontal: 10,
                marginBottom: 15,
              }}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="mr-3" />}
              renderItem={renderItem}
            />
          </View>
          {selectedCategoryId && (
            <ProductList productId={selectedCategoryId}></ProductList>
          )}
        </>
      )}
    </View>
  );
};
