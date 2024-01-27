import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/Navigation/AppNavigator";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return <AppNavigator />;
}
