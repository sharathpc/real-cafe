import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Input } from "@/components/ui/input";
import { CustomHeaderFlatList } from "@/components/app/CustomHeaderFlatList";
import { getAllOrders } from "@/services/Vendor";
import { useAuthStore } from "@/store/authStore";

const Orders = () => {
  const { user } = useAuthStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllOrders(user.documentId).then((data) => {
      console.log(data);
    });
  }, []);

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
