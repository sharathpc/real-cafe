import { Text, TouchableOpacity, Image } from "react-native";

interface Props {
  onPress: () => void;
  image: string;
  name: string;
  selected: boolean;
}
export const Tab = ({ onPress, image, name, selected }: Props) => {
  return (
    <TouchableOpacity
      className={` ${selected ? "border-orange-500 bg-orange-500" : "border-gray-500 bg-transparent"} px-2 py-1 rounded-xl overflow-hidden border flex-row items-center`}
      onPress={onPress}
    >
      {image && (
        <Image source={{ uri: image }} className="h-5 w-5 mr-2"></Image>
      )}
      <Text className={`${selected ? "text-white" : "text-black"}`}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};
