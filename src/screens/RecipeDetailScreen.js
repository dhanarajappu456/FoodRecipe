import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import YouTubeIframe from "react-native-youtube-iframe";
import Loading from "../components/Loading";

function RecipeDetailScreen(props) {
  const navigation = useNavigation();
  const mealData = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const [mealInfo, setMealInfo] = useState({});
  console.log(mealData.strMealThumb);

  const getMealDetails = async (mealId) => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/lookup.php?i=" + mealId
      );
      console.log("single", response.data.meals[0]);
      setMealInfo(response.data.meals[0]);
    } catch (err) {
      console.log("error", err.message);
    }
  };
  useEffect(() => {
    getMealDetails(mealData.idMeal);
  }, []);
  // keep only those ingredients which has a value in the response
  // that is in the mealinfo
  const getMealIndices = (meal) => {
    console.log("getind", meal);
    if (!meal) {
      return [];
    }
    let indices = [];
    for (let i = 0; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indices.push(i);
      }
    }
    console.log("srf", meal?.strYoutube?.split("="));
    return indices;
  };
  const getYoutubeId = (url) => {
    const arr = url?.split("=");
    console.log("peaks", arr);
    if (arr) {
      console.log("ytds", arr[1]);
    }

    return arr ? arr[1] : null;
  };

  return (
    <View className="flex-1 items-center">
      {!mealInfo ? (
        <Loading />
      ) : (
        <ScrollView
          className="bg-white"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <StatusBar style="light" />
          <View className="flex-row justify-center">
            <Image
              sharedTransitionTag={mealData.strMeal}
              source={{ uri: mealData.strMealThumb }}
              style={{
                width: wp(98),
                height: hp(50),
                borderRadius: 30,
                marginTop: 10,
              }}
            />
          </View>
          <View className="w-full absolute flex-row justify-between pt-7">
            <TouchableOpacity
              className="ml-5 p-2 bg-black rounded-full"
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon size={hp(3.5)} color="red" strokeWidth={4.5} />
            </TouchableOpacity>
            <TouchableOpacity
              className="mr-5 p-2 bg-black rounded-full"
              onPress={() => {
                setIsFavourite(!isFavourite);
              }}
            >
              <HeartIcon
                size={hp(3.5)}
                color={isFavourite ? "red" : "white"}
                strokeWidth={4.3}
              />
            </TouchableOpacity>
          </View>
          <View className="px-4 pt-8">
            <View>
              <Text
                style={{ fontSize: hp(3) }}
                className="font-bold text-neutral-700 flex-1"
              >
                {mealInfo.strMeal}
              </Text>
              <Text className="font-medium text-neutral-500 flex-1">
                {mealInfo.strArea}
              </Text>
            </View>
            <View className="space-y-4 mt-3">
              <Text className="font-bold text-neutral-700 flex-1">
                Ingredients
              </Text>

              <View className="space-y-2 ml-3">
                {getMealIndices(mealInfo).map((ind) => {
                  return (
                    <View key={ind} className="flex-row items-center space-x-4">
                      <View
                        className="bg-amber-300 rounded-full"
                        style={{ width: hp(1.5), height: hp(1.5) }}
                      />
                      <Text
                        style={{ fontSize: hp(1.9) }}
                        className="font-extrabold text-neutral-600"
                      >
                        {mealInfo["strMeasure" + ind]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.9) }}
                        className="font-medium text-neutral-600"
                      >
                        {mealInfo["strIngredient" + ind]}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <View className="space-y-4 mt-3">
                <Text className="font-bold text-neutral-700 flex-1">
                  Instructions
                </Text>

                <Text>{mealInfo?.strInstructions}</Text>
              </View>
            </View>
            {mealInfo?.strYoutube && (
              <View className="space-y-2">
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="mt-3 space-y-4 font-bold"
                >
                  Recipe Video
                </Text>
                <View>
                  <YouTubeIframe
                    videoId={getYoutubeId(mealInfo?.strYoutube)}
                    height={hp(30)}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default RecipeDetailScreen;
