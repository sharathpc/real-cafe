import React from "react";
import { View, Text } from "react-native";

import { CustomSafeAreaView } from "@/components";
import { CustomText } from "@/components/ui/CustomText";

const VendorLogin = () => {
  return (
    <View>
      <CustomSafeAreaView>
        <View className="flex-1 justify-center items-center">
          <CustomText customStyle="text-2xl font-bold text-gray-80">
            Order online,collect seamlessly
          </CustomText>
          <CustomText customStyle="text-2xl font-semibold mt-0.5 mb-7 opacity-80 text-gray-900">
            Log in or sign up
          </CustomText>
        </View>
      </CustomSafeAreaView>
    </View>
  );
};

export default VendorLogin;
