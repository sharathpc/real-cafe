import { memo } from "react";
import { Image, Text, TextStyle, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  Camera,
  House,
  ScrollText,
  SquareUserRound,
} from "lucide-react-native";

import HomeFocused from "@/assets/icons/home1.png";
import Home from "@/assets/icons/home.png";
import OrderFocused from "@/assets/icons/selected-marker.png";
import Order from "@/assets/icons/order.png";
import ProfileFocused from "@/assets/icons/person.png";
import Profile from "@/assets/icons/account.png";

interface TabProps {
  name: string;
}

interface IconProp {
  focused: boolean;
}

const styles = {
  width: RFValue(30),
  height: RFValue(30),
};

const textStyleInActive: TextStyle = {
  textAlign: "center",
  marginTop: 4,
  color: "orange",
  fontSize: RFValue(9.5),
};

const textStyleActive: TextStyle = {
  textAlign: "center",
  marginTop: 0,
  color: "green",
  fontSize: RFValue(9.5),
};

const TabIcon = memo(({ name }: TabProps) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={name === "home" ? Home : name === "orders" ? Order : Profile}
        style={styles}
      />
      <Text style={textStyleInActive}>{name}</Text>
    </View>
  );
});

const TabIconFocused = memo(({ name }: TabProps) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={
          name === "home"
            ? HomeFocused
            : name === "orders"
              ? OrderFocused
              : ProfileFocused
        }
        style={styles}
      />
      <Text style={textStyleActive}>{name}</Text>
    </View>
  );
});

export const HomeTabIcon = ({ focused }: IconProp) => {
  return (
    <House
      color={`${focused ? "#ea6710" : "#767474"}`}
      strokeWidth={2}
      size={40}
    />
  );
};

export const OrderTabIcon = ({ focused }: IconProp) => {
  return (
    <ScrollText
      size={40}
      color={`${focused ? "#ea6710" : "#767474"}`}
      strokeWidth={2}
    />
  );
};
export const ProfileTabIcon = ({ focused }: IconProp) => {
  return (
    <SquareUserRound
      size={40}
      color={`${focused ? "#ea6710" : "#767474"}`}
      strokeWidth={2}
    />
  );
};
