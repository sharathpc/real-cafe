import { ReactNode, useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  Pressable,
  FlatList,
  ListRenderItem,
  SafeAreaView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { UserAvatar } from "./UserAvatar";
import { useAuthStore } from "@/store/authStore";

interface Props {
  title: string;
  data: any[];
  header?: ReactNode;
  noData?: {
    icon: ReactNode;
    text: string;
  };
  renderItem?: ListRenderItem<any> | null;
  onRefresh?: (() => void) | null;
}

export const CustomHeaderFlatList = ({
  title,
  data,
  header,
  noData = {
    icon: <AntDesign name="dashboard" size={80} />,
    text: "No Data",
  },
  renderItem,
  onRefresh,
}: Props) => {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  /* const onRefresh = () => {
    setRefreshing(true);
    console.log("testing");
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
      // You could re-fetch product data here
    }, 3000);
  }; */

  return (
    <SafeAreaView className="flex-1 justify-start">
      <FlatList
        data={data}
        keyExtractor={(item) => item.documentId}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        ListHeaderComponent={() => (
          <View className="mx-3">
            <View className="flex-row justify-between items-center pt-4 pb-4">
              <Text className="text-4xl font-bold capitalize">{title}</Text>
              <Pressable onPress={() => router.push("/profile")}>
                <UserAvatar user={user} />
              </Pressable>
            </View>
            {header}
          </View>
        )}
        renderItem={renderItem}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center opacity-60">
            {noData.icon}
            <Text className="text-lg font-bold mt-3 opacity-60">
              {noData.text}
            </Text>
          </View>
        }
        keyboardShouldPersistTaps="handled"
        bounces={true}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};
