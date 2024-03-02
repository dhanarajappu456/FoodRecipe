import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Animated, { FadeInDown } from "react-native-reanimated";

// function App() {
//   return <Animated.View entering={FadeIn} exiting={FadeOut} />;
// }
function Categories({
  activeCategoryIndex,
  setActiveCategoryIndex,
  categories,
}) {
  // console.log(
  //   "inside cate",
  //   categories,
  //   typeof categories,
  //   categoryData[0].image,
  //   activeCategoryIndex,
  //   activeCategoryIndex
  // );
  return (
    <Animated.View entering={FadeInDown.duration(200)}>
      <ScrollView
        horizontal
        className="space-x-4"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((cat, index) => {
          let isActive = index == activeCategoryIndex;
          let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-1"
              onPress={() => setActiveCategoryIndex(index)}
            >
              <View className={"rounded-full p-[6px] " + activeButtonClass}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-500" style={{ fontSize: hp(1.6) }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

export default Categories;
