import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  loading: boolean;
  onPress?: () => void;
  totalItems: number;
  title: string;
}

export const ArrowButton = ({ loading, onPress, totalItems, title }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={loading || totalItems === 0}
      onPress={onPress}
      className={`bg-green-700 p-3 ${totalItems !== 0 ? "justify-between" : "justify-center"} items-center flex-row rounded-2xl my-3 mx-4`}
    >
      {totalItems !== 0 && totalItems && (
        <View>
          <Text className="text-white font-bold">Total Items</Text>
          <Text className="text-white font-bold ml-5">{totalItems}</Text>
        </View>
      )}

      <View className="flex-row items-center justify-center">
        <Text className="text-white text-lg font-semibold">{title}</Text>
        {loading ? (
          <ActivityIndicator color="white" className="mx-1" size="small" />
        ) : (
          <Icon name="arrow-right" color="#fff" size={RFValue(25)} />
        )}
      </View>
    </TouchableOpacity>
  );
};
