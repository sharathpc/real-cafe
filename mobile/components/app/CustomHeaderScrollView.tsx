import { ReactNode, useState } from "react";
import { router } from "expo-router";
import { Image } from "expo-image";
import {
  View,
  Text,
  Pressable,
  FlatList,
  ListRenderItem,
  SafeAreaView,
} from "react-native";

import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
interface Props {
  title: string;
  data: any[];
  header?: ReactNode;
  renderItem?: ListRenderItem<any> | null;
  onRefresh?: (() => void) | null;
}

export const CustomHeaderScrollView = ({
  title,
  data,
  header,
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
                <Avatar alt={user.firstname}>
                  <AvatarFallback>
                    <Text className="uppercase">{`${user.firstname.charAt(0)}${user.lastname.charAt(0)}`}</Text>
                  </AvatarFallback>
                </Avatar>
              </Pressable>
            </View>
            {header}
          </View>
        )}
        renderItem={renderItem}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center opacity-60">
            <Image
              source="https://ik.imagekit.io/projectc/media_library/parcel_f524312cf1__rmd5FVxMx.png"
              style={{
                width: 80,
                height: 80,
              }}
            />
            <Text className="text-xl font-bold mt-3 opacity-60">
              No Results Found
            </Text>
            <Text className="font-medium opacity-70">
              Please start adding records
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
