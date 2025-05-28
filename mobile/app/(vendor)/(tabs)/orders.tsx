import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { Feather, Fontisto } from "@expo/vector-icons";
import { Image } from "expo-image";
import { DateTime } from "luxon";
import DateTimePicker from "@react-native-community/datetimepicker";

import { CustomHeaderFlatList } from "@/components/app/CustomHeaderFlatList";
import { getAllOrders } from "@/services/Vendor";
import { useAuthStore } from "@/store/authStore";
import { IVendorOrder } from "@/models";
import { UserAvatar } from "@/components/app/UserAvatar";
import { Separator } from "@rn-primitives/select";

const ITEM_MARGIN = 10;
const ITEM_WIDTH = Dimensions.get("window").width - ITEM_MARGIN * 2;

const DATE_FILTERS = [
  {
    id: 1002,
    label: "Today",
    startDate: DateTime.now(),
    endDate: DateTime.now(),
  },
  {
    id: 1003,
    label: "This Week",
    startDate: DateTime.now().startOf("week"),
    endDate: DateTime.now(),
  },
  {
    id: 1004,
    label: "This Month",
    startDate: DateTime.now().startOf("month"),
    endDate: DateTime.now(),
  },
  {
    id: 1001,
    label: "Custom",
    startDate: DateTime.now(),
    endDate: DateTime.now(),
  },
];

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
        <View>
          <View className="flex-row justify-around">
            {DATE_FILTERS.map((filter) => (
              <Pressable
                key={filter.label}
                className="px-2 py-1 bg-slate-200 rounded-lg"
                /* style={{
                backgroundColor: filter.date === date ? "red" : "transparent",
              }} */
                onPress={() => setDateFilter(filter)}
              >
                <Text className="text-xs font-semibold text-center">
                  {filter.label}
                </Text>
              </Pressable>
            ))}
          </View>
          <View className="my-2 items-center">
            {dateFilter.id !== 1001 ? (
              <View className="flex-row items-center">
                <Text className="text-sm ">
                  {dateFilter.startDate.toFormat("LLL dd yyyy")}
                </Text>
                <Fontisto
                  className="mx-4 my-2"
                  name="arrow-right-l"
                  size={24}
                />
                <Text className="text-sm ">
                  {dateFilter.endDate.toFormat("LLL dd yyyy")}
                </Text>
              </View>
            ) : (
              <View className="flex-row items-center">
                <DateTimePicker
                  testID="startDatePicker"
                  value={dateFilter.startDate.toJSDate()}
                  mode="date"
                  maximumDate={new Date()}
                  style={styles.picker}
                  onChange={(_, selectedDate) => {
                    if (selectedDate) {
                      setDateFilter({
                        ...dateFilter,
                        startDate: DateTime.fromJSDate(
                          selectedDate
                        ) as DateTime<true>,
                      });
                    }
                  }}
                />
                <Fontisto className="my-2" name="arrow-right-l" size={24} />
                <DateTimePicker
                  testID="endDatePicker"
                  value={dateFilter.endDate.toJSDate()}
                  mode="date"
                  maximumDate={new Date()}
                  style={styles.picker}
                  onChange={(_, selectedDate) => {
                    if (selectedDate) {
                      setDateFilter({
                        ...dateFilter,
                        endDate: DateTime.fromJSDate(
                          selectedDate
                        ) as DateTime<true>,
                      });
                    }
                  }}
                />
              </View>
            )}
          </View>
        </View>
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
