import { ReactNode } from "react";
import { router } from "expo-router";
import { View, Text, Pressable, FlatList, ListRenderItem } from "react-native";

import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
interface Props {
  title: string;
  data: any[];
  header?: ReactNode;
  emptyMessage?: string;
  renderItem?: ListRenderItem<any> | null;
}

export const CustomHeaderScrollView = ({
  title,
  data,
  header,
  emptyMessage = "No results found",
  renderItem,
}: Props) => {
  const { user } = useAuthStore();

  return (
    <View className="flex-1 justify-start">
      <FlatList
        data={data}
        keyExtractor={(item) => item.documentId}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={() => (
          <View className="mx-3">
            <View className="flex-row justify-between items-center pt-20 pb-4">
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
        ListEmptyComponent={<Text>{emptyMessage}</Text>}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};
