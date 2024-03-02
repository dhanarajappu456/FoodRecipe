import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
function WelcomeScreen() {
  const ringPadding1 = useSharedValue(0);
  const ringPadding2 = useSharedValue(0);
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      ringPadding1.value = withSpring(ringPadding1.value + hp(5));
    }, 100);

    setTimeout(() => {
      ringPadding2.value = withSpring(ringPadding2.value + hp(5.5));
    }, 300);
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2500);
  }, []);
  return (
    <View className="flex-1 justify-center items-center bg-amber-500">
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ringPadding2 }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ringPadding2 }}
        >
          <Image
            source={require("../../assets/fds.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>
      <StatusBar style="light" />
      <View className="flex item-center my-4 space-y-3">
        <Text
          className="font-bold tracking-widest text-center text-white"
          style={{ fontSize: hp(8) }}
        >
          FoodPrepy
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="font-medium tracking-widest text-white"
        >
          One Stop Solution For All Food Recipes
        </Text>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "red",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
export default WelcomeScreen;
