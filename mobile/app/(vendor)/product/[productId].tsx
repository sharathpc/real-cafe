import { View, Text } from "react-native";
import React from "react";
import { CustomHeaderScrollView } from "@/components/app/CustomHeaderScrollView";

const Product = () => {
  return (
    <CustomHeaderScrollView title="Product" isBackButton={true}>
      <View>
        <Text>Test</Text>
      </View>
    </CustomHeaderScrollView>
  );
};

export default Product;
