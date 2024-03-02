import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

import axios from "axios";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../components/Categories";
import Recipes from "../components/Recipes";

function HomeScreen() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  // console.log("memememe");
  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const getCategories = async function () {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(response.data.categories);
    } catch (err) {
      console.log("error", err.message);
    }
  };

  const getRecipes = async function (category = "Beef") {
    console.log("meal ", category);
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/filter.php?c=" + category
      );

      console.log("get recipes", response.data, category);
      setMeals(response.data.meals);
    } catch (err) {
      console.log("error meal", err.message);
    }
  };

  const handleCategoryChange = (category, index) => {
    getRecipes(category);
    setActiveCategoryIndex(index);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        className="space-y-6 pt-10"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="mx-4 flex-row justify-between">
          <Image
            source={require("../../assets/avat.png")}
            style={{ height: hp(5), width: hp(5) }}
          />
          <BellIcon size={hp(4)} color="grey" />
        </View>
        <View className="mx-4">
          <Text
            style={{ fontSize: hp(1.9) }}
            className="font-semibold text-neutral-600"
          >
            Hello Daan!!
          </Text>
          <Text
            style={{ fontSize: hp(3.2) }}
            className="font-bold text-neutral-600"
          >
            Your Food At Your <Text className="text-amber-400">Fingertips</Text>
          </Text>
        </View>
        <View className="mx-4 flex-row justify-between rounded-full bg-black/5 p-[9px]">
          <TextInput
            style={{ flex: 1, fontSize: hp(1.7) }}
            placeholder="Search the recipe"
          />
          <View className="bg-white p-4 rounded-full">
            <MagnifyingGlassIcon color="gray" size={hp(2.5)} strokeWidth={3} />
          </View>
        </View>
        {/* categories */}
        <View className="mx-4">
          {categories && (
            <Categories
              categories={categories}
              activeCategoryIndex={activeCategoryIndex}
              handleCategoryChange={handleCategoryChange}
            />
          )}
        </View>
        <View>
          <Recipes
            categories={categories}
            meals={meals}
            style={{ fontSize: hp(3) }}
          />
        </View>
      </ScrollView>
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
export default HomeScreen;
