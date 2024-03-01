import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, View } from "react-native";
function WelcomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-amber-500">
      <View className="bg-white/20 rounded-full p-8">
        <View className="bg-white/20 rounded-full p-6 ">
          <Image
            source={require("../../assets/fds.png")}
            style={{ width: 210, height: 210 }}
          />
        </View>
      </View>
      <StatusBar style="light" />
      <View className="flex item-center my-4 space-y-3">
        <Text className="font-bold tracking-widest text-center text-white text-2xl">
          FoodPrepy
        </Text>
        <Text className="font-medium tracking-widest text-white">
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
