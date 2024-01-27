import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import ThemeTile from "../../components/ThemeTile";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ThemeTile />
    </View>
  );
};

export default HomeScreen;
