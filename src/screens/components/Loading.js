import React from "react";
import { ActivityIndicator, View } from "react-native";

function Loading(props) {
  return (
    <View className="flex-1 justify-center align-middle">
      <ActivityIndicator {...props} />
    </View>
  );
}

export default Loading;
