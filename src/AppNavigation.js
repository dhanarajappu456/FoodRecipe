import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen"; // Import from the correct path
import WelcomeScreen from "./screens/WelcomeScreen";
const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
