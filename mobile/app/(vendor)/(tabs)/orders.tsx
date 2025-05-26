import React, { useState } from "react";
import { View } from "react-native";

import { Input } from "@/components/ui/input";
import { CustomHeaderFlatList } from "@/components/app/CustomHeaderFlatList";

const Orders = () => {
  const [query, setQuery] = useState("");

  return (
    <CustomHeaderFlatList
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
    ></CustomHeaderFlatList>
  );
};

export default Orders;
