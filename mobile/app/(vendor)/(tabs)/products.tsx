import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { getAllCategories } from "@/services/Vendor";

import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Input } from "@/components/ui/input";
import { CustomHeaderScrollView } from "@/components/app/CustomHeaderScrollView";

interface Item {
  documentId: string;
  name: string;
  image: {
    url: string;
  };
  products: any[];
}

const ITEM_MARGIN = 4;
const numColumns = 2;
const ITEM_WIDTH =
  (Dimensions.get("window").width - ITEM_MARGIN * (numColumns * 2 + 1)) /
    numColumns -
  10;
const ALL_CATEGORY_ITEM = {
  documentId: "all",
  name: "All",
  image: {
    url: "https://ik.imagekit.io/projectc/media_library/all_e243121c80_z6D1BiQcC.png",
  },
  products: [],
};

const Products = () => {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [categories, setCategories] = useState<Item[]>([]);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    let filteredCategories: Item[] = [];
    if (query) {
      categories.forEach((category) => {
        const newCategory = {
          ...category,
          products: category.products.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          ),
        };

        if (newCategory.products.length) {
          filteredCategories.push(newCategory);
        }
      });
    } else {
      filteredCategories = [...categories];
    }

    if (categoryId !== "all") {
      filteredCategories = filteredCategories.filter(
        (item) => item.documentId === categoryId
      );
    }

    setFilteredData(filteredCategories);
  }, [query, categories, categoryId]);

  useEffect(() => {
    getAllCategories().then((data) => {
      console.log(data.data);
      setCategories(data.data);
    });
  }, []);

  const renderCategory = (item: Item) => {
    return (
      <Pressable
        key={item.documentId}
        className="flex-1 justify-center items-center h-auto"
        onPress={() => setCategoryId(item.documentId)}
      >
        <View className="p-1.5 bg-slate-200 mb-1 rounded-full">
          <Image
            source={{ uri: item.image.url }}
            style={{ width: 24, height: 24 }}
          />
        </View>
        <Text
          style={[item.documentId === categoryId && styles.categorySelected]}
          className="text-[8px] text-slate-500 px-2 py-0.5 rounded-md text-center font-bold"
        >
          {item.name}
        </Text>
      </Pressable>
    );
  };

  const renderCategoryGroup = ({ item }: { item: Item }) => {
    const rows = [];
    for (let i = 0; i < item.products.length; i += numColumns) {
      const rowItems = item.products.slice(i, i + numColumns);
      rows.push(
        <View
          key={`row-${item.documentId}-${i}`}
          className="flex-row justify-between"
        >
          {rowItems.map(renderProduct)}
        </View>
      );
    }

    return (
      <View key={item.documentId} className="mt-2 mx-2">
        <View className="flex-row mx-2 my-2 items-center">
          <Image
            source={{ uri: item.image.url }}
            style={{ width: 20, height: 20 }}
          />
          <Text className="text-base font-semibold ml-2">{item.name}</Text>
        </View>
        {rows}
      </View>
    );
  };

  const renderProduct = (item: any) => (
    <Pressable style={styles.card} key={item.documentId}>
      <Image
        source={{ uri: item.image.url }}
        style={styles.image}
        contentFit="fill"
      />
      <View className="flex-row justify-between items-center w-full px-2 py-2">
        <Text className="text-base font-medium">{item.name}</Text>
        <Text
          className="text-xs font-medium"
          style={[item.available ? styles.inStock : styles.outOfStock]}
        >
          {item.available ? "In Stock" : "Out of Stock"}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <CustomHeaderScrollView
      title="Products"
      data={filteredData}
      header={
        <View>
          <Input
            className="mb-4"
            placeholder="Search..."
            value={query}
            onChangeText={setQuery}
            clearButtonMode="while-editing"
          />
          <View className="flex-row justify-between items-center">
            {[ALL_CATEGORY_ITEM, ...categories].map((item) =>
              renderCategory(item)
            )}
          </View>
        </View>
      }
      renderItem={renderCategoryGroup}
    ></CustomHeaderScrollView>
  );
};

const styles = StyleSheet.create({
  categorySelected: {
    backgroundColor: "#cbd5e1",
    color: "#475569",
  },
  card: {
    width: ITEM_WIDTH,
    margin: ITEM_MARGIN,
    borderRadius: 10,
    backgroundColor: "#fafafa",
    borderColor: "#eee",
    borderWidth: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 160,
    backgroundColor: "#e2e8f0",
  },
  inStock: { color: "green" },
  outOfStock: { color: "red" },
});

export default Products;
