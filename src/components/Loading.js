import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

function Loading(props) {
  return (
    <View
      className="flex-1 justify-center align-center"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator {...props} />
      <Text>Loading....</Text>
    </View>
  );
}

export default Loading;
