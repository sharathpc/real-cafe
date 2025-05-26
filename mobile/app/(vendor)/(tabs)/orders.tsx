import React, { useState } from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";

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
        </View>
      }
      noData={{
        icon: <Feather name="archive" size={80} />,
        text: "No Orders Found",
      }}
      //renderItem={() => ()}
    />
  );
};

export default Orders;
