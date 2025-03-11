import { ReactNode } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
interface Props extends TextInputProps {
  rightIcon?: boolean;
  onClear?: () => void;
  right?: ReactNode;
}

export const CustomInput = ({ rightIcon, onClear, right, ...props }: Props) => {
  // className="text w-[10%] ml-2.5"

  return (
    <View className="flex-row items-center justify-between rounded-lg border border-gray-300 w-full my-2.5 bg-white shadow-sm shadow-opacity-60">
      <TextInput
        {...props}
        className="w-[68%] py-3 px-3 pb-4 -bottom-1"
        placeholderTextColor="#ccc"
      ></TextInput>
      <View className="mr-3">{right}</View>
      <View className="w-[5%] justify-center items-center mr-2.5">
        {rightIcon && (
          <TouchableOpacity onPress={onClear}>
            <Icon
              name="close-circle-sharp"
              size={RFValue(16)}
              color="#ccc"
            ></Icon>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
