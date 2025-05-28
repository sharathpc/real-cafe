import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { DateTime } from "luxon";

import { CustomHeaderFlatList } from "@/components/app/CustomHeaderFlatList";
import { getAllOrders } from "@/services/Vendor";
import { useAuthStore } from "@/store/authStore";
import { IVendorOrder } from "@/models";
import { UserAvatar } from "@/components/app/UserAvatar";
import { Separator } from "@rn-primitives/select";
import {
  CustomDateFilter,
  DATE_FILTERS,
} from "@/components/app/CustomDateFilter";

const ITEM_MARGIN = 10;
const ITEM_WIDTH = Dimensions.get("window").width - ITEM_MARGIN * 2;

const Orders = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<IVendorOrder[]>([]);
  const [dateFilter, setDateFilter] = useState(DATE_FILTERS[0]);

  const getTotalAmount = (order: IVendorOrder) => {
    return order.items.reduce(
      (total, item) => item.product.price * item.quantity + total,
      0
    );
  };

  const renderOrder = (order: IVendorOrder) => {
    return (
      <View key={order.documentId} style={styles.card}>
        <View className="flex-row justify-between items-center">
          <View className="flex-row justify-start items-center">
            <UserAvatar user={order.user} size={28} />
            <Text numberOfLines={1} className="text-sm ml-2 font-semibold">
              {`${order.user.firstname} ${order.user.lastname}`}
            </Text>
          </View>
          <Text numberOfLines={1} className="text-sm font-semibold">
            {order.order_status}
          </Text>
        </View>

        <Separator className="my-2 w-full" />

        <View className="items-start gap-1">
          {order.items.map((item) => (
            <View key={item.id} className="flex-row items-center">
              <Image
                source={{ uri: item.product.image.url }}
                style={styles.image}
                contentFit="fill"
              />
              <Text numberOfLines={1} className="text-sm ml-2 font-medium">
                {`${item.quantity} x ${item.product.name}`}
              </Text>
            </View>
          ))}
        </View>

        <Separator className="my-2 w-full" />

        <View className="flex-row justify-between items-center">
          <Text className="text-xs">
            {`Order placed on ${DateTime.fromISO(order.createdAt).toFormat("LLL d 'at' t")}`}
          </Text>
          <Text className="text-xs font-semibold">
            {`₹ ${getTotalAmount(order)}`}
          </Text>
        </View>
      </View>
    );
  };

  const getData = () => {
    getAllOrders(
      user.documentId,
      dateFilter.startDate.toISODate(),
      dateFilter.endDate.plus({ days: 1 }).toISODate()
    ).then((data) => {
      setOrders(data.data);
    });
  };

  useEffect(() => {
    getData();
  }, [dateFilter]);

  return (
    <CustomHeaderFlatList
      title="Orders"
      data={orders}
      header={
        <CustomDateFilter
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      }
      noData={{
        icon: <Feather name="archive" size={80} />,
        text: "No Orders Found",
      }}
      renderItem={({ item }) => renderOrder(item)}
      onRefresh={getData}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    width: ITEM_WIDTH,
    margin: ITEM_MARGIN,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fafafa",
    borderColor: "#eee",
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    width: 18,
    height: 18,
    backgroundColor: "#e2e8f0",
    borderRadius: 6,
  },
  picker: {
    transform: [{ scale: 0.7 }],
  },
});

export default Orders;
