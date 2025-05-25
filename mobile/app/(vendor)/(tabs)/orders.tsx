import React, { useState } from "react";
import { CustomHeaderScrollView } from "@/components/app/CustomHeaderScrollView";
import { View } from "react-native";
import { Input } from "@/components/ui/input";

const Orders = () => {
  const [query, setQuery] = useState("");

  return (
    <CustomHeaderScrollView
      title="Orders"
      data={[]}
      header={
        <View>
          <Input
            className="mb-4"
            placeholder="Search..."
            value={query}
            onChangeText={setQuery}
            clearButtonMode="while-editing"
          />
          {/* <View className="flex-row justify-between items-center">
            {[ALL_CATEGORY_ITEM, ...categories].map((item) =>
              renderCategory(item)
            )}
          </View> */}
        </View>
      }
      //renderItem={() => ()}
    ></CustomHeaderScrollView>
  );
};

export default Orders;
