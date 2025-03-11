import { useState } from "react";
import { router } from "expo-router";
import { Animated, View, Image, StyleSheet, Alert } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { Keyboard } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";

import { imageData, lightColors } from "@/utilis";
import { CustomText } from "@/components/ui/CustomText";
import { CustomInput } from "@/components/ui/CustomInput";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomSafeAreaView, ProductSlider } from "@/components";
import { employeeLogin } from "@/services";

const gradientColors = [...lightColors].reverse();

const EmployeeLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);

  const hanldeAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);

    employeeLogin(email, password)
      .then(() => {
        router.push("/home");
      })
      .catch((error) => {
        Alert.alert(
          "Login Failed",
          "Please check your credentials or try again later"
        );
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      var direction: string = "";
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? "right" : "left";
      } else {
        direction = translationY > 0 ? "down" : "up";
      }
      console.log("Translate y and x", translationX, translationY, direction);
      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);

      if (newSequence.join(" ") === "up down left right") {
        setGestureSequence([]);
        console.log("Correct sequence");
        router.push("/vendorlogin");
      }
    }
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-white">
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContent}
            >
              <LinearGradient
                colors={gradientColors}
                className="pt-14 w-full"
              />
              <View className="justify-center items-center w-full bg-white px-2.5 pb-2.5">
                <Image
                  source={imageData[7]}
                  className="h-12 w-12 rounded-2xl my-2.5"
                />
                <CustomText customStyle="text-2xl font-bold text-gray-80">
                  Order online,collect seamlessly
                </CustomText>
                <CustomText customStyle="text-2xl font-semibold mt-0.5 mb-7 opacity-80 text-gray-900">
                  Log in or sign up
                </CustomText>
                <CustomInput
                  onChangeText={(text) => setEmail(text)}
                  onClear={() => setEmail("")}
                  value={email}
                  right={<CustomText customStyle="">@realpage.com</CustomText>}
                  placeholder="Enter email"
                  inputMode="email"
                  rightIcon={true}
                />
                <CustomInput
                  onChangeText={(text) => setPassword(text)}
                  onClear={() => setPassword("")}
                  value={password}
                  placeholder="Enter Password"
                  inputMode="text"
                  rightIcon={true}
                />
                <CustomButton
                  title="continue"
                  disabled={
                    email.length > 0 && password.length > 0 ? false : true
                  }
                  onPress={() => hanldeAuth()}
                  loading={loading}
                ></CustomButton>
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};
export default EmployeeLogin;

const styles = StyleSheet.create({
  subContent: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
});
