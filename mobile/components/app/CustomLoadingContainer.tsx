import { ReactNode } from "react";
import { View } from "react-native";

import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  loading: boolean;
  children: ReactNode;
}

export const CustomLoadingContainer = ({ loading = true, children }: Props) => {
  return loading ? (
    <View className="flex-1 justify-center items-center bg-white">
      <Skeleton className="h-12 w-12 rounded-full" />
    </View>
  ) : (
    children
  );
};
