import { ScaleContextProvider, useScaleContext } from "@/context/scaleContext";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScalePress } from "../global/ScalePress";
import { HomeTabIcon, OrderTabIcon, ProfileTabIcon } from "./TabIcons";
import { screenWidth } from "@/utilis";
import { CartHoc } from "../checkout/CartHoc";
import { CustomInput } from "../ui/CustomInput";
import { CustomText } from "../ui/CustomText";

export const BottomTabs = (props: BottomTabBarProps) => {
  const { scrollY } = useScaleContext();

  const { state, navigation, descriptors } = props;
  const bottom = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            scrollY.value === 1
              ? withTiming(100, { duration: 300 })
              : withTiming(0, { duration: 300 }),
        },
      ],
    };
  });

  const indicatorStyle = useAnimatedStyle(() => {
    const baseLeft = 40;
    let slideValue = state.index === 2 ? 0.35 : 0.36;
    return {
      left: withTiming(baseLeft + state.index * screenWidth * slideValue),
    };
  });

  return (
    <>
      <CartHoc />
      <Animated.View
        style={[animatedStyle]}
        className={`pb-[${bottom.bottom}] w-full absolute
         h-20
        shadow-opacity-30
        bg-white
        shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]
        elevation-5
        shadow-orange-600
        bottom-0
        z-5
        flex-row
        items-center
        justify-around`}
      >
        <View
          className="w-[82%] flex-row
        justify-between
        items-center
        pl-4"
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <ScalePress
                key={index}
                onPress={onPress}
                onLongPress={onLongPress}
                className={`justify-center items-center flex-row ${isFocused ? "border-b-2 border-b-[black]" : ""}`}
              >
                {route?.name === "home" && <HomeTabIcon focused={isFocused} />}
                {route?.name === "orders" && (
                  <OrderTabIcon focused={isFocused} />
                )}
                {route?.name === "profile" && (
                  <ProfileTabIcon focused={isFocused} />
                )}
              </ScalePress>
            );
          })}
        </View>

        <Animated.View
          style={indicatorStyle}
          className={
            "absolute top-0 h-1  rounded-bl-full rounded-br-full  w-[15%] bg-orange-500"
          }
        />
      </Animated.View>
    </>
  );
};
