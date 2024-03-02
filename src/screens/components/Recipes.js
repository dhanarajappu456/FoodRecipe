import MasonryList from "@react-native-seoul/masonry-list";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Loading from "./Loading";
function Recipes({ categories, meals }) {
  //   console.log("mone", categories);
  return (
    <View className="mx-4 space-y-3">
      <Text style={{ fontSize: hp(3) }} className="font-bold text-neutral-600">
        Recipes
      </Text>
      <View className="mb-10">
        {categories.length > 0 && meals.length > 0 ? (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
            //   refreshing={isLoadingNext}
            //   onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
            //   onEndReached={() => loadNext(ITEM_CNT)}
          />
        ) : (
          //   <View className="flex-1">
          //     <Loading size="large" className="mt-20" />
          //   </View>
          <View className="flex-1">
            <Loading size="large" className="mt-20" />
          </View>
        )}
      </View>
    </View>
  );
}

export default Recipes;

const RecipeCard = ({ item, index }) => {
  //   console.log(item.image);
  let isEven = index % 2 == 0;
  //   console.log(index);
  return (
    <Animated.View entering={BounceIn}>
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 7,
          paddingRight: isEven ? 7 : 0,
        }}
        className="flex justify-center mb-4 space-y-1 "
      >
        <Image
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
          source={{ uri: item.strMealThumb }}
        />
        <Text className="font-semibold ml-2 text-neutral-400">
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
