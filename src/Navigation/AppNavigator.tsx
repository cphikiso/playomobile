import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/Home/HomeScreen";
import ThemeScreen from "../screens/Home/ThemeScreen/ThemeScreen";
import NarratorVoicesScreen from "../screens/Home/NarratorVoices/NarratorVoicesScreen";
import StoryScreen from "../screens/Home/StoryScreen/StoryScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // headerShown: false
          headerShadowVisible: false,
          title: "",
          headerTintColor: "#000",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          // options={{ headerShown: false }}
          name="ThemeConfirm"
          component={ThemeScreen}
        />
        <Stack.Screen
          options={{ title: "Choose narrator's voice" }}
          name="NarratorVoices"
          component={NarratorVoicesScreen}
        />
        <Stack.Screen
          // options={{ headerShown: false }}
          name="StoryScreen"
          component={StoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
