import { Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { getAllCategories, getVendorProducts } from "@/services/Vendor";

const Products = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    getAllCategories().then((data) => console.log(data));
    getVendorProducts(user.documentId).then((data) => console.log(data));
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Text>Vendor Products</Text>
    </SafeAreaView>
  );
};

export default Products;
