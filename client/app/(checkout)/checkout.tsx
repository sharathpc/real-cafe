import { View, ScrollView, Platform, Button, Alert } from "react-native";
import React, { useState } from "react";
import { OrderList } from "@/components/checkout/OrderList";
import { hocStyle } from "@/styles/GlobalStyles";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { useCartStore } from "@/state/cartStore";
import { useAuthStore } from "@/state/authStore";
import { Order, OrderItem } from "@/models";
import { createOrder } from "@/services/OrderService";

const Checkout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { cart, getTotalItemsCount, getTotalPrice, clearCart } = useCartStore();
  const { currentOrder, setCurrentOrder } = useAuthStore();
  const totalItems = getTotalItemsCount();
  const totalPrice = getTotalPrice();

  const handlePlaceOrder = () => {
    console.log("CURRENT ORDER", currentOrder);
    setCurrentOrder(null);
    if (currentOrder !== null) {
      Alert.alert(
        "Please pick up the placed order or cancel the previous order"
      );
      return;
    }
    const transformedOrderItems: OrderItem[] = cart.map((item) => ({
      id: item._id,
      item: item._id,
      count: item.count,
    }));

    if (transformedOrderItems.length === 0) {
      Alert.alert("Add any items to place Order");
      return;
    }
    const newOrder: Order = {
      items: transformedOrderItems,
      vendor: cart[0].item.vendor,
      totalPrice: totalPrice,
    };

    setLoading(true);
    createOrder(newOrder)
      .then((data) => {
        console.log(
          "----------------DATA FROM CREATE ORDER------------------------------------",
          data
        );
        console.log(
          "-----------ORderd Items-----------------------------------",
          newOrder
        );
        setCurrentOrder(data);
        clearCart();
        Alert.alert("Order Placed Successfully");
      })
      .catch((err) => {
        Alert.alert("Error Occured during creating a new order", err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="bg-[#f5f6fb]"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <OrderList />

        <View style={hocStyle.cartContainer} className="p-0">
          <View
            className={`my-4 ${Platform.OS === "ios" ? "mb-8" : "mb-3"} p-0`}
          >
            <ArrowButton
              title="Place Order"
              loading={loading}
              totalItems={totalItems}
              onPress={() => handlePlaceOrder()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Checkout;
